import os
from flask import Flask, jsonify
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)
DB_PASS = os.getenv("DB_PASSWORD")
API_KEY = os.getenv("API_KEY")
@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "db_configured": bool(DB_PASS)})
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
