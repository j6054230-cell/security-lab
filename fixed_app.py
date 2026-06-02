import os, sqlite3, subprocess, hashlib
from flask import Flask, request, jsonify
from dotenv import load_dotenv


load_dotenv()
app = Flask(__name__)


# ✅ 1-fix: env'dan o'qish
SECRET_KEY = os.getenv("SECRET_KEY")
DB_PASS   = os.getenv("DB_PASS")


@app.route("/login", methods=["POST"])
def login():
    user = request.form["username"]
    conn = sqlite3.connect("users.db")
    # ✅ 2-fix: parameterized query
    conn.execute("SELECT * FROM users WHERE name=?", (user,))


def do_hash(data):
    # ✅ 3-fix: sha256 + salt
    salt = os.urandom(32)
    return hashlib.pbkdf2_hmac("sha256", data.encode(), salt, 100000)


def run_cmd(cmd_list):
    # ✅ 4-fix: shell=False, list arg
    subprocess.call(cmd_list, shell=False)


if __name__ == "__main__":
    # ✅ 5-fix: debug env'dan, host 127
    debug = os.getenv("DEBUG", "false").lower() == "true"
    app.run(debug=debug, host="127.0.0.1")
