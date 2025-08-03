from flask import Flask, request, redirect
import requests, os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

CLIENT_ID = os.getenv("TIDAL_CLIENT_ID")
CLIENT_SECRET = os.getenv("TIDAL_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

@app.route('/')
def login():
    return redirect(
        f"https://auth.tidal.com/oauth2/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=streaming"
    )

@app.route('/callback')
def callback():
    code = request.args.get("code")
    token_url = "https://auth.tidal.com/oauth2/token"
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(token_url, data=data, headers=headers)
    return response.json()

if __name__ == '__main__':
    app.run(port=8888)
