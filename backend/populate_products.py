import requests
import mysql.connector

# Function to fetch data from the URL
def fetch_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

# Database configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "cartwise"
}

# Function to insert data into the MySQL database
def insert_data(data):
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    for product in data:
        sql = "INSERT INTO product (id, title, description, price, rating, stock, brand, category, image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (
            int(product['id']),
            product['title'],
            product['description'],
            float(product['price']),
            float(product['rating']),
            int(product['stock']),
            product['brand'],
            product['category'],
            product['thumbnail']
        )
        cursor.execute(sql, values)

    connection.commit()
    connection.close()

if __name__ == "__main__":
    url = "https://dummyjson.com/products?limit=100&skip=0"
    data = fetch_data(url)

    if data:
        # print(data['products'][0])
        try:
            insert_data(data['products'])
            print("Data inserted into the database.")

        except Exception as e:
            print("Insertion failed.")
            print(e)
    else:
        print("Failed to fetch data from the URL.")
