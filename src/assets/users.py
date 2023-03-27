# To run, first install:
# pip install Faker

import requests
import json
from faker import Faker
import random

# Define the URL of the API endpoint
url = "http://localhost:8080/user/create"

# Instantiate a Faker object to generate fake data
fake = Faker()

email_extensions = ["hotmail.com", "gmail.com", "kpn.nl", "outlook.com"]
admins = [0,0,0,0,0,0,0,0,0,0,0,1]

# Define the data to be sent in the POST request
data = {
    "users": []
}

# Generate 50 users with random data
for i in range(2):
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = fake.email()
    # email = first_name + "_" + last_name + "@" + random.choice(email_extensions)

    user = {
        "emailAddress": email,
        "firstName": first_name,
        "lastName": last_name,
        # "admin": random.choice(admins)
    }
    data["users"].append(user)

# Convert the data to JSON
json_data = json.dumps(data)

# Set the headers for the request
headers = {
    "Content-Type": "application/json"
}

# Send the POST request to add the users
response = requests.post(url, data=json_data, headers=headers)

# Check the response status code
if response.status_code == 200:
    print(i)
    # print("Users added successfully!")
else:
    print(i, "err")
    # print(f"Error adding users: {response.text}")
