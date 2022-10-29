import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

#cur.execute("INSERT INTO users (names, last_names, email, password) VALUES (?, ?, ?, ?)",
#            ('Antonio', 'Donis','sulcud@email.com','kubernetes')
#            )

#cur.execute("INSERT INTO users (names, last_names, email, password) VALUES (?, ?, ?, ?)",
#            ('Antonio2', 'Donis2','sulcud2@email.com','kubernetes')
#            )

connection.commit()
connection.close()