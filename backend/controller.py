import hashlib
import json
import random

import db


def sanitize_mongo_article(article) -> dict:
    article = {
        "id": article["id"],
        "amount": article["amount"],
        "metric": article["metric"],
        "name": article["name"],
        "description": article["description"],
        "price": article["price"],
        "image": article["image"],
        "alt": article["alt"],
        "discount": article["discount"]
    }
    return article


def register(email, names, last_names, password):
    password_hash = hashlib.sha3_512(password.encode()).hexdigest()
    conn = db.sqlite()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (email, names, last_names, password_hash) VALUES (?, ?, ?, ?)",
        (email, names, last_names, password_hash))
    conn.commit()


def get_cookie(cookie) -> int:
    with open("data/sessions.json") as file:
        sessions = json.load(file)
    return sessions[cookie]


def store_cookie(email) -> str:
    with open("data/sessions.json") as file:
        sessions = json.load(file)
    cookie = ''.join(random.choice('abcdefghijklmnopqrstuvwxyz1234567890')
                     for _ in range(32))
    conn = db.sqlite()
    cursor = conn.cursor()
    cursor.execute("SELECT id from users WHERE email = ? LIMIT 1", (email, ))
    user_id = cursor.fetchone()[0]
    sessions[cookie] = user_id
    with open("data/sessions.json", 'w') as file:
        json.dump(sessions, file)
    return cookie


def articles(page: int, pattern: str = "", min_price: int = 0, max_price: int = 100) -> list[dict]:
    pattern = pattern if pattern is not None else ""
    min_price = min_price if min_price is not None else -1
    max_price = max_price if max_price is not None else 1000

    filter = {
        "name": {
            "$regex": f".*{pattern}.*",
            '$options' : 'i'
        },
        "price": {
            "$lte": max_price,
            "$gte": min_price
        }
    }

    mongo_client = db.mongo()

    result = [sanitize_mongo_article(
        a) for a in mongo_client["parcial"]["articles"].find(filter)]

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


def basket(session, articles):
    user_id = get_cookie(session)
    articles_ids = list(map(int, articles.keys()))
    subtotal = 0
    for article in db.mongo()["parcial"]["articles"].find(
        {"id": {"$in": articles_ids}}
    ):
        subtotal += article["price"] * \
            articles[str(article["id"])]["amount"] * \
            (1 - article["discount"] / 100)
    total = subtotal * 1.19
    conn = db.sqlite()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO baskets (buyer, products, subtotal, total) VALUES (?, ?, ?, ?)",
        (user_id, json.dumps(articles_ids), subtotal, total)
    )
    conn.commit()
