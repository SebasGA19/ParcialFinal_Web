import json

import flask

import controller


articles_bp = flask.Blueprint("articles", "articles")


@articles_bp.route('/articles/<page>', methods=['POST'])
def articles_pag(page: str):
    page = int(page)
    request_data = flask.request.get_json()
    # Filters
    pattern = request_data['pattern'] if request_data and 'pattern' in request_data else None
    pattern = pattern.lower() if request_data and pattern is not None else None
    min_price = request_data['price-from'] if request_data and 'price-from' in request_data else None
    max_price = request_data['price-to'] if request_data and 'price-to' in request_data else None
    return json.dumps(controller.articles(page, pattern, min_price, max_price))


@articles_bp.route('/images/<id>', methods=['GET'])
def images_id(id):
    return controller.image(id)
