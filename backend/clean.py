import json
import random


def transform_article(article: dict) -> dict:
    return {
        "id": article["id"],
        "amount": article["contents"]["amount"],
        "metric": article["contents"]["metric"],
        "name": article["name"],
        "description": ''.join(article["description"]),
        "price": article["price"],
        "image": f"/images/{article['id']}.jpg",
        "alt": f"{article['id']}.jpg",
        "discount": random.randint(0, 25)
    }


def main():
    with open("json/data.json", "rb") as file:
        contents = json.load(file)
    with open("json/data.json", "w") as file:
        contents = list(map(transform_article, contents))
        json.dump(contents, file)


if __name__ == "__main__":
    main()
