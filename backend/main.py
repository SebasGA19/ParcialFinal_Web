import flask
from flask_cors import CORS

import articles
import register

app = flask.Flask(__name__)
# Blueprints
app.register_blueprint(articles.articles_bp)
app.register_blueprint(register.register_bp)
# Cors
CORS(app)


def main():
    app.run()


if __name__ == "__main__":
    main()
