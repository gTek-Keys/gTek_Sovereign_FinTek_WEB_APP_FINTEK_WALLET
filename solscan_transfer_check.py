import requests
import json

API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE3NDQ0NDg4Nzg3NDksImVtYWlsIjoic2VtaS1jb25kdWN0b3ItZnV0dXJlQGllZWUub3JnIiwiYWN0aW9uIjoidG9rZW4tYXBpIiwiYXBpVmVyc2lvbiI6InYyIiwiaWF0IjoxNzQ0NDQ4ODc4fQ.TipXXXYdhJFZgLUDNb5XjIAOlATXZkeoCkGoun8unes"
ADDRESS = "3izqrwVEfQpvxPmimpgBfqVVuWGrfJkxuSih6PXuo4zA"
URL = f"https://pro-api.solscan.io/v2.0/account/transfer?address={ADDRESS}&page=1&page_size=10&sort_by=block_time&sort_order=desc"

HEADERS = {
    "token": API_KEY,
    "content-type": "application/json"
}

response = requests.get(URL, headers=HEADERS)

if response.status_code == 200:
    data = response.json()
    with open("latest_transfers.json", "w") as f:
        json.dump(data, f, indent=2)
    print("✅ Transfer data saved to 'latest_transfers.json'")
else:
    print(f"❌ Failed to retrieve data: {response.status_code}")
    print(response.text)

