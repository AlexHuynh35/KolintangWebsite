import psycopg2
import resend
import utils.database as database
import utils.validation as validation
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

app.config["DBNAME"] = os.getenv("DBNAME")
app.config["DBUSER"] = os.getenv("DBUSER")
app.config["DBPASS"] = os.getenv("DBPASS")
app.config["DBHOST"] = os.getenv("DBHOST")
app.config["DBPORT"] = os.getenv("DBPORT")

resend.api_key = os.getenv("RESENDAPIKEY")
app.config["DOMAINEMAIL"] = os.getenv("DOMAINEMAIL")
app.config["OWNEREMAIL"] = os.getenv("OWNEREMAIL")

@app.route("/test_app")
def test_app():
    return "Kolintang"

@app.route("/check_date", methods=["POST"])
def check_date():
    data = request.get_json()
    date = data["date"]

    connection = database.get_database(app.config["DBNAME"], app.config["DBUSER"], app.config["DBPASS"], app.config["DBHOST"], app.config["DBPORT"])
    cursor = connection.cursor()

    available = database.check_request_date(cursor, date)

    cursor.close()
    connection.close()
    return jsonify({
        "available": available
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

    connection = database.get_database(app.config["DBNAME"], app.config["DBUSER"], app.config["DBPASS"], app.config["DBHOST"], app.config["DBPORT"])
    cursor = connection.cursor()

    all_fields_filled = name != "" and email != "" and phone != "" and date != "" and venue != "" and city != "" and state != ""
    if not all_fields_filled:
        connection.close()
        return jsonify({
            "error": "Please make sure to fill out all required fields"
        }), 400

    email_valid = validation.validate_email(email)
    if not email_valid:
        connection.close()
        return jsonify({
            "error": "Email address is not valid, please enter a valid email address"
        }), 400

    phone_valid = validation.validate_phone(phone)
    if not phone_valid:
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

    date_obj = datetime.fromisoformat(date)
    readable_date = date_obj.strftime("%A, %B %d, %Y")

    owner_params: resend.Emails.SendParams = {
        "from": app.config["DOMAINEMAIL"],
        "to": app.config["OWNEREMAIL"],
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
        """
    }
    r = resend.Emails.send(owner_params)

    recipient_params: resend.Emails.SendParams = {
        "from": app.config["DOMAINEMAIL"],
        "to": [email],
        "subject": "We Received Your Booking Request",
        "html": f"""
            <p>Hi {name},</p>

            <p>Thanks for submitting a booking request for <strong>{readable_date}</strong>.</p>

            <p>We'll contact you soon to confirm the details.</p>

            <p>Best,</p>
            <p>Cita Lomendehe</p>
        """
    }
    r = resend.Emails.send(recipient_params)

    # """
    cursor.close()
    connection.close()
    return jsonify({
        "error": "Submission failed, please try again"
    }), 400
    # """

    submitted = database.insert_request(cursor, name, email, phone, date, venue, city, state, message)
    if submitted:
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({
            "submitted": submitted,
            "name": name
        })
    else:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Submission failed, please try again"
        }), 400

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)