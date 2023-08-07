import requests
import random
import string
import time
from datetime import datetime, timedelta

# Target URL
TARGET_URL = 'http://localhost:3001'  # Replace with the actual target URL

# Number of requests to send
NUM_REQUESTS = 10

# List of allowed HTTP methods
ALLOWED_METHODS = ['GET', 'HEAD']

# Function to generate random string data
def random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))

# Generate random valid hotel or destination ID
def random_valid_id():
    length = 4
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

# Generate random valid date from today
def random_valid_date():
    today = datetime.now()
    random_days = random.randint(0, 365)
    random_date = today + timedelta(days=random_days)
    return random_date.strftime('%Y-%m-%d')

# Generate random price, guests, and rooms values
def random_valid_price():
    return round(random.uniform(10, 1000), 2)

def random_valid_integer(min_val, max_val):
    return random.randint(min_val, max_val)

# Your fuzzer code (function or script)
def run_fuzzer():
    #gen random query parameters
    random_hotel_id = random_valid_id()
    random_destination_id = random_valid_id()
    random_checkin = random_valid_date()
    random_checkout = random_valid_date()

    # Your fuzzer logic here
    #gen random URLs 
    url_examples = [
        '/',
        f"/api/disphotels?destination_id={random_destination_id}&checkin={random_checkin}&checkout={random_checkout}&lang=en_US&currency=SGD&country_code=SG&guests=2&rooms=1&partner_id=1",
        f"/api/disprooms?hotel_id={random_hotel_id}&destination_id={random_destination_id}&checkin={random_checkin}&checkout={random_checkout}&lang=en_US&currency=SGD&partner_id=1&country_code=SG&guests=2&rooms=1",
        f"/payment?hotel=Conrad%20Tokyo&checkin={random_checkin}&checkout={random_checkout}&guests=2&room=Royal%20Suite,%201%20King%20Bed&price=5725.96",
        f"/paymentstripe?price=5725.96"
    ]

    random_url = random.choice(url_examples)
    full_url = TARGET_URL + random_url

    # Fuzzer loop
    # Choose a random HTTP method from the allowed methods
    http_method = random.choice(ALLOWED_METHODS)

    # Generate random input data for POST and PUT methods
    if http_method in ['POST', 'PUT']:
        data = {
            'param1': random_string(10),
            'param2': random_string(8),
            # Add more fields as needed
        }
    else:
        data = None

    try:
        # Send the HTTP request
        response = requests.request(http_method, full_url, json=data)

        # Print the HTTP method, URL, status code, and response content
        print(f"HTTP Method: {http_method}")
        print(f"URL: {full_url}")
        print(f"Status Code: {response.status_code}")
        print(f"Response Content: {response.content}\n")

        # Print the response headers
        print("Response Headers:")
        for header, value in response.headers.items():
            print(f"{header}: {value}")

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}\n")

# Get the current time
start_time = time.time()

# Define the duration in seconds (24 hours)
duration = 24 * 60 * 60

# Run the fuzzer continuously until the duration is reached
while time.time() - start_time < duration:
    run_fuzzer()
    time.sleep(1)  # Add a delay between iterations (e.g., 1 second)

print("Fuzzer run for 24 hours is complete.")
