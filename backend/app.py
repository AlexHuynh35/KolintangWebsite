import psycopg2
import resend
import utils.database as database
import utils.validation as validation
from datetime import datetime, timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_login import LoginManager, login_required, current_user, login_user, logout_user
from utils.user import User
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)

CORS(app, supports_credentials=True)

app.config["DB_NAME"] = os.getenv("DB_NAME")
app.config["DB_USER"] = os.getenv("DB_USER")
app.config["DB_PASS"] = os.getenv("DB_PASS")
app.config["DB_HOST"] = os.getenv("DB_HOST")
app.config["DB_PORT"] = os.getenv("DB_PORT")

resend.api_key = os.getenv("RESEND_API_KEY")
app.config["DOMAIN_EMAIL"] = os.getenv("DOMAIN_EMAIL")
app.config["OWNER_EMAIL"] = os.getenv("OWNER_EMAIL")
app.config["SITE_URL"] = os.getenv("SITE_URL")

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    connection = database.get_database(app.config["DB_NAME"], app.config["DB_USER"], app.config["DB_PASS"], app.config["DB_HOST"], app.config["DB_PORT"])
    cursor = connection.cursor()

    cursor.execute(
        "SELECT id, email FROM admins WHERE id = %s",
        (user_id,)
    )

    user = cursor.fetchone()

    if user:
        return User(user[0], user[1])

    return None

@app.route("/test_app")
def test_app():
    return "Kolintang"

@app.route("/check_date", methods=["POST"])
def check_date():
    data = request.get_json()
    date = data["date"]

    connection = database.get_database(app.config["DB_NAME"], app.config["DB_USER"], app.config["DB_PASS"], app.config["DB_HOST"], app.config["DB_PORT"])
    cursor = connection.cursor()

    available = database.check_request_date(cursor, date)

    cursor.close()
    connection.close()
    return jsonify({
        "success": available
    })

@app.route("/submit_form", methods=["POST"])
def submit_form():
    data = request.get_json()
    name = data["name"]
    email = data["email"]
    phone = data["phone"]
    date = data["date"]
    venue = data["venue"]
    city = data["city"]
    state = data["state"]
    message = data["message"]

    connection = database.get_database(app.config["DB_NAME"], app.config["DB_USER"], app.config["DB_PASS"], app.config["DB_HOST"], app.config["DB_PORT"])
    cursor = connection.cursor()

    all_fields_filled = name != "" and email != "" and phone != "" and date != "" and venue != "" and city != "" and state != ""
    if not all_fields_filled:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Please make sure to fill out all required fields"
        }), 400

    email_valid = validation.validate_email(email)
    if not email_valid:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Email address is not valid, please enter a valid email address"
        }), 400

    phone_valid = validation.validate_phone(phone)
    if not phone_valid:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Phone number is not valid, please enter a valid phone number"
        }), 400

    date_available = database.check_request_date(cursor, date)
    if not date_available:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Date is already booked, please pick a different date"
        }), 400

    no_duplicate = database.check_request_contact(cursor, email, phone)
    if not no_duplicate:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Your request is pending, please be patient"
        }), 400

    """
    cursor.close()
    connection.close()
    return jsonify({
        "error": "Submission failed, please try again"
    }), 400
    """

    submitted = database.insert_request(cursor, name, email, phone, date, venue, city, state, message)
    if submitted:
        connection.commit()
        cursor.close()
        connection.close()
        date_obj = datetime.fromisoformat(date)
        readable_date = date_obj.strftime("%A, %B %d, %Y")
        owner_params: resend.Emails.SendParams = {
            "from": app.config["DOMAIN_EMAIL"],
            "to": app.config["OWNER_EMAIL"],
            "subject": "New Booking Request",
            "html": f"""
                <p><strong>Name: </strong>{name}</p>
                <p><strong>Email: </strong>{email}</p>
                <p><strong>Phone: </strong>{phone}</p>
                <p><strong>Date: </strong>{readable_date}</p>
                <p><strong>Venue: </strong>{venue}</p>
                <p><strong>City: </strong>{city}</p>
                <p><strong>State: </strong>{state}</p>
                <p><strong>Message: </strong>{message}</p>

                <p>Approve or deny request <a href="{app.config["SITE_URL"]}/admin/login">here</a>.</p>
            """
        }
        r = resend.Emails.send(owner_params)
        recipient_params: resend.Emails.SendParams = {
            "from": app.config["DOMAIN_EMAIL"],
            "to": [email],
            "subject": "We Received Your Booking Request",
            "html": f"""
                <p>Hi {name},</p>

                <p>Thank you for submitting a booking request for <strong>{readable_date}</strong>.</p>

                <p>We'll contact you soon to confirm the details.</p>

                <p>Best,</p>
                <p>Cita Lomendehe</p>
            """
        }
        r = resend.Emails.send(recipient_params)
        return jsonify({
            "success": submitted,
            "name": name
        })
    else:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Submission failed, please try again"
        }), 400

@app.route("/submit_login", methods=["POST"])
def submit_login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    connection = database.get_database(app.config["DB_NAME"], app.config["DB_USER"], app.config["DB_PASS"], app.config["DB_HOST"], app.config["DB_PORT"])
    cursor = connection.cursor()

    user = database.check_login(cursor, email, password)
    if user:
        user_obj = User(user[0], user[1])
        login_user(user_obj)
        cursor.close()
        connection.close()
        return jsonify({
            "success": True
        })
    else:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Email or password is incorrect, please try again"
        }), 400

@app.route("/check_login", methods=["GET"])
def check_login():
    if current_user.is_authenticated:
        return jsonify({
            "success": True,
            "email": current_user.email
        })

    return jsonify({
        "error": "Please log in"
    }), 401

@app.route("/get_bookings", methods=["POST"])
@login_required
def get_bookings():
    connection = database.get_database(app.config["DB_NAME"], app.config["DB_USER"], app.config["DB_PASS"], app.config["DB_HOST"], app.config["DB_PORT"])
    cursor = connection.cursor()

    requests = database.get_all_requests(cursor)

    cursor.close()
    connection.close()
    return jsonify(requests)

@app.route("/confirm_request", methods=["PUT"])
@login_required
def confirm_request():
    data = request.get_json()
    booking_id = data["id"]

    connection = database.get_database(app.config["DB_NAME"], app.config["DB_USER"], app.config["DB_PASS"], app.config["DB_HOST"], app.config["DB_PORT"])
    cursor = connection.cursor()

    updated = database.update_status(cursor, booking_id, "confirmed")
    if updated:
        connection.commit()
        cursor.close()
        connection.close()
        readable_date = updated[4].strftime("%A, %B %d, %Y")
        recipient_params: resend.Emails.SendParams = {
            "from": app.config["DOMAIN_EMAIL"],
            "to": [updated[2]],
            "subject": "Booking Request Confirmation",
            "html": f"""
                <p>Hi {updated[1]},</p>

                <p>Thank you for your patient.</p>
                <p>We want to inform you that your booking request for <strong>{readable_date}</strong> at <strong>{updated[5]}, {updated[6]}, {updated[7]}</strong> has been confirmed.</p>
                
                <p>Please email us at {app.config["OWNER_EMAIL"]} if you have any questions or would like to make changes to your booking.</p>

                <p>Best,</p>
                <p>Cita Lomendehe</p>
            """
        }
        r = resend.Emails.send(recipient_params)
        return jsonify({
            "success": True,
            "status": updated[9]
        })
    else:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Submission failed, please try again"
        }), 400

@app.route("/cancel_request", methods=["PUT"])
@login_required
def cancel_request():
    data = request.get_json()
    booking_id = data["id"]

    connection = database.get_database(app.config["DB_NAME"], app.config["DB_USER"], app.config["DB_PASS"], app.config["DB_HOST"], app.config["DB_PORT"])
    cursor = connection.cursor()

    updated = database.update_status(cursor, booking_id, "cancelled")
    if updated:
        connection.commit()
        cursor.close()
        connection.close()
        readable_date = updated[4].strftime("%A, %B %d, %Y")
        recipient_params: resend.Emails.SendParams = {
            "from": app.config["DOMAIN_EMAIL"],
            "to": [updated[2]],
            "subject": "We Cannot Fulfill Your Request At This Time",
            "html": f"""
                <p>Hi {updated[1]},</p>

                <p>Thank you for your patient.</p>
                <p>Unfortunately, we cannot fulfill your booking request for <strong>{readable_date}</strong> at <strong>{updated[5]}, {updated[6]}, {updated[7]}</strong>.</p>
                
                <p>Please feel free to submit another request at our <a href="{app.config["SITE_URL"]}/book">website</a>.</p>
                
                <p>Best,</p>
                <p>Cita Lomendehe</p>
            """
        }
        r = resend.Emails.send(recipient_params)
        return jsonify({
            "success": True,
            "status": updated[9]
        })
    else:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Submission failed, please try again"
        }), 400

@app.route("/submit_logout", methods=["POST"])
@login_required
def submit_logout():
    logout_user()
    return jsonify({
        "success": True,
    })

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)