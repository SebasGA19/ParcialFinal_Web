import base64
import flask
from flask import request
from flask_cors import CORS
import sqlite3
import json
import random


app = flask.Flask(__name__)
CORS(app)
cookie_s = {}
with open('json/data.json', "rb") as file:
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

    if (request_data):
        if 'names' in request_data:
            names = request_data['names']

        if 'last-names' in request_data:
            last_names = request_data['last-names']

        if 'email' in request_data:
            email = request_data['email']

        if 'password' in request_data:
            password = request_data['password']

    conn = get_db_connection()
    conn.execute('INSERT INTO users (names, last_names, email, password) VALUES (?, ?, ?, ?)',
                 (names, last_names, email, password))
    conn.commit()
    conn.close()

    cookie = ''.join(random.choice('abcdefghijklmnopqrstuvwxyz')
                     for _ in range(62))
    cookie_s[cookie] = email
    return json.dumps({"cookie": cookie})


@app.route('/articles/<page>', methods=['POST'])
def articles_pag(page: str):
    page = int(page)
    request_data = request.get_json()
    result = articles

    if request_data:
        result = []
        pattern = request_data['pattern'] if 'pattern' in request_data else None
        pattern = pattern.lower() if pattern is not None else None
        price_from = request_data['price-from'] if 'price-from' in request_data else None
        price_to = request_data['price-to'] if 'price-to' in request_data else None
        for article in articles:
            price = article['price']
            name = article['name'].lower()

            if pattern is not None and pattern not in name:
                continue
            if price_from is not None and price_from > price:
                continue
            if price_to is not None and price_to < price:
                continue
            result.append(article)

    range_low = (page-1)*12
    range_high = (page)*12
    pages = int(len(result) / 12) + 1

    return json.dumps({
        "pages": pages,
        "articles": result[range_low:range_high]
    })


@app.route('/article/<id>', methods=['POST'])
def article_id(id):
    for article in articles:
        if (article['id'] == id):
            return article


@app.route('/images/<id>', methods=['GET'])
def images_id(id):
    with open("images/"+id+".jpg", "rb") as image_file:
        return image_file.read()


def main():
    app.run()


if __name__ == "__main__":
    main()
