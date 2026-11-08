"""@auth_required: reads the session cookie, verifies the JWT and exposes g.user_id."""
from functools import wraps

from flask import abort, g, request

from ..services.token_service import COOKIE_NAME, decode_token


def auth_required(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        token = request.cookies.get(COOKIE_NAME)
        payload = decode_token(token) if token else None
        if not payload:
            abort(401, description="Please sign in")
        g.user_id = payload["sub"]
        return view(*args, **kwargs)

    return wrapper
