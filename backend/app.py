from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/test_app")
def test_app():
    return "Kolintang"

@app.route("/check_date", methods=["POST"])
def check_date():
    data = request.get_json()
    date = data["date"]

    available = True

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
    location = data["location"]

    submitted = True

    return jsonify({
        "submitted": submitted,
        "name": name
    })

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)