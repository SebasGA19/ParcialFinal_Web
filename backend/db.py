import sqlite3
import os
import json

from pymongo import MongoClient


__connection_sql = sqlite3.connect('data/database.db', check_same_thread=False)
__mongo_string = "mongodb://parcial:parcial@mongo:27017/parcial"
__connection_mongo = MongoClient(__mongo_string)

if __connection_mongo["parcial"]["articles"].find_one() is None:
    with open('json/data.json', "rb") as file:
        __articles = json.load(file)
        __connection_mongo["parcial"]["articles"].insert_many(__articles)


with open('schema.sql') as f:
    __connection_sql.executescript(f.read())


if not os.path.exists("data/sessions.json"):
    with open("data/sessions.json", 'w') as file:
        file.write("{}")


def sqlite():
    return __connection_sql


def mongo():
    return __connection_mongo
