import base64
import flask
from flask import request
import sqlite3
import json
import random


app = flask.Flask(__name__)
cookie_s = {}
with open('json/data.json',"rb") as file:
    articles = json.load(file)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return "hola"

@app.route('/register', methods=['PUT'])
def register():
    request_data = request.get_json()

    names = None
    last_names = None
    email = None
    password = None

    if(request_data):
        if 'names' in request_data:
            names=request_data['names']

        if 'last-names' in request_data:
            last_names=request_data['last-names']

        if 'email' in request_data:
            email=request_data['email']

        if 'password' in request_data:
            password=request_data['password']


    conn = get_db_connection()
    conn.execute('INSERT INTO users (names, last_names, email, password) VALUES (?, ?, ?, ?)',
                    (names,last_names,email,password))
    conn.commit()
    conn.close()

    cookie = ''.join(random.choice('abcdefghijklmnopqrstuvwxyz') for _ in range(62))
    cookie_s[cookie]=email
    return json.dumps({"cookie": cookie})

@app.route('/articles/<page>', methods=['POST'])
def articles_pag(page):
    page = int(page)
    request_data = request.get_json()
    articles_filt = []
    pattern = None
    price_from = None
    price_to = None

    if(request_data):
        if 'pattern' in request_data:
            pattern = request_data['pattern']

        if 'price-from' in request_data:
            price_from = request_data['price-from']

        if 'price-to' in request_data:
            price_to = request_data['price-to']

    print(articles)
    for article in articles:
        price = article['price']
        name = article['name']

        if(price_from<price and price<price_to):
            if(pattern.lower() in name.lower()):
                articles_filt.append(article)

    range_low= (page-1)*12
    range_high= (page)*12
    return json.dumps(articles_filt[range_low:range_high])

@app.route('/article/<id>', methods=['POST'])
def article_id(id):
    for article in articles:
        if(article['id']==id):
            return article

@app.route('/images/<id>', methods=['GET'])
def images_id(id):
    for article in articles:
        if(article['id']== id):
            with open("images/"+id+".jpg","rb") as image_file:
                encoded_string = base64.b64encode(image_file.read())
            alt = id+".jpg"

    return json.dumps({"alt": alt,"contents": encoded_string})

def main():
    app.run()

if __name__ == "__main__":
    main()
