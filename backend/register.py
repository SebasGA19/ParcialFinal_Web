import json

import flask

import controller

register_bp = flask.Blueprint("register", "register")


@register_bp.route('/register', methods=['PUT'])
def register():
    request_data = flask.request.get_json()
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
