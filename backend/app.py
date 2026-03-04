from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/test_app")
def test_app():
    return "Kolintang"

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)