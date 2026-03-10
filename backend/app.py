import psycopg2
import utils.database as database
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

    date_available = database.check_request_date(cursor, date)
    if not date_available:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Date is already booked"
        }), 400

    no_duplicate = database.check_request_contact(cursor, email, phone)
    if not no_duplicate:
        cursor.close()
        connection.close()
        return jsonify({
            "error": "Your request is pending"
        }), 400

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
            "error": "Please try again"
        }), 400

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)