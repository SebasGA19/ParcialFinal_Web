import sqlite3
import os

__connection = sqlite3.connect('database.db', check_same_thread=False)

with open('schema.sql') as f:
    __connection.executescript(f.read())


if not os.path.exists("sessions.json"):
    with open("sessions.json", 'w') as file:
        file.write("{}")


def sqlite():
    return __connection
