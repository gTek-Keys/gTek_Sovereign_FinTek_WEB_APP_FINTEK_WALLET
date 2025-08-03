import os
from dotenv import load_dotenv
import requests

load_dotenv()

API_KEY = os.getenv("SOLSCAN_API_KEY")
ADDRESS = "GyKKrkrrQh8gD9kXEpWw5cdELxYNUJ9EBH4HKtgDpump"

headers = {
    "token": API_KEY,
}

response = requests.get(
    f"https://pro-api.solscan.io/v2.0/token/meta?address={ADDRESS}",
    headers=headers
)

print("✅ Token Metadata Response:")
print(response.json())

