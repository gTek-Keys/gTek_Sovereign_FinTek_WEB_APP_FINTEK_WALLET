import requests

# Replace with your wallet address
wallet_address = "3izqrwVEfQpvxPmimpgBfqVVuWGrfJkxuSih6PXuo4zA"

url = f"https://public-api.solscan.io/account/transactions?account={wallet_address}&limit=10"

headers = {
    "accept": "application/json"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print("✅ Transaction Data Retrieved:\n")
    for tx in data:
        print(f"Signature: {tx['txHash']}")
        print(f"Slot: {tx['slot']}")
        print(f"Timestamp: {tx.get('blockTime', 'N/A')}")
        print("-" * 40)
else:
    print(f"❌ Failed to retrieve data: {response.status_code}")
    print(response.text)

