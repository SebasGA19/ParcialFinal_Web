import sqlite3
import sys

conn = sqlite3.connect(sys.argv[1])
cursor = conn.cursor()

cursor.execute("SELECT * FROM users")
print(cursor.fetchall())
cursor.execute("SELECT * FROM baskets")
print(cursor.fetchall())