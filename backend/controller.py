import hashlib
import json
import random

import db


def register(email, names, last_names, password):
    password_hash = hashlib.sha3_512(password.encode()).hexdigest()
    print(password_hash)
    conn = db.sqlite()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (email, names, last_names, password_hash) VALUES (?, ?, ?, ?)",
        (email, names, last_names, password_hash))
    conn.commit()


def get_cookie(cookie) -> str:
    with open("sessions.json") as file:
        sessions = json.load(file)
    return sessions[cookie]


def store_cookie(email) -> str:
    with open("sessions.json") as file:
        sessions = json.load(file)
    cookie = ''.join(random.choice('abcdefghijklmnopqrstuvwxyz1234567890')
                     for _ in range(32))
    sessions[cookie] = email
    with open("sessions.json", 'w') as file:
        json.dump(sessions, file)
    return cookie


with open('json/data.json', "rb") as file:
    __articles = json.load(file)


def articles(page: int, pattern: str = "", min_price: int = 0, max_price: int = 100) -> list[dict]:
    pattern = pattern if pattern is not None else ""
    min_price = min_price if min_price is not None else -1
    max_price = max_price if max_price is not None else 1000

    result = list(filter(
        lambda article: pattern in article["name"] and
        min_price <= article["price"] <= max_price,
        __articles
    ))
    range_low = (page-1)*12
    range_high = (page)*12
    pages = int(len(result) / 12) + 1
    return {
        "pages": pages,
        "articles": result[range_low:range_high]
    }


def image(img_id: str or int) -> bytes:
    with open("images/"+img_id+".jpg", "rb") as image_file:
        return image_file.read()
