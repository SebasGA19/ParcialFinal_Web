import flask
from flask import request
from flask_cors import CORS
import sqlite3
import json

import controller

app = flask.Flask(__name__)
CORS(app)
cookie_s = {}


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
    if (not request_data):
        return "", 500
    names = request_data['names'] if 'names' in request_data else None
    last_names = request_data['last-names'] if 'last-names' in request_data else None
    email = request_data['email'] if 'email' in request_data else None
    password = request_data['password'] if 'password' in request_data else None
    if names is None or last_names is None or email is None or password is None:
        return "", 500

    controller.register(email, names, last_names, password)
    return json.dumps({"cookie": controller.store_cookie(email)})


@app.route('/articles/<page>', methods=['POST'])
def articles_pag(page: str):
    page = int(page)
    request_data = request.get_json()
    # Filters
    pattern = request_data['pattern'] if request_data and 'pattern' in request_data else None
    pattern = pattern.lower() if request_data and pattern is not None else None
    min_price = request_data['price-from'] if request_data and 'price-from' in request_data else None
    max_price = request_data['price-to'] if  request_data and 'price-to' in request_data else None
    return json.dumps(controller.articles(page, pattern, min_price, max_price))


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
