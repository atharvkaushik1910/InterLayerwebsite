import requests
import json

url = "http://localhost:8000/api/process_intent"
payload = {"query": "I want to buy a MacBook Pro"}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
