"""HTTP layer for accounts: parse + validate, call the service, shape the response."""
from flask import abort, g, request

from ..models.user_model import to_public
from ..schemas.auth_schemas import LoginIn, SignupIn
from ..services import auth_service
from ..services.token_service import clear_session_cookie, issue_token, set_session_cookie
from ..utils.responses import ok


def _json_body() -> dict:
    if not request.is_json:  # JSON-only + SameSite cookies + CORS allow-list = CSRF protection
        abort(415, description="Send JSON")
    return request.get_json(silent=True) or {}


def _session_response(user: dict, status: int):
    response = ok(to_public(user), status)
    return set_session_cookie(response, issue_token(str(user["_id"])))


def signup():
    return _session_response(auth_service.sign_up(SignupIn(**_json_body())), 201)


def login():
    return _session_response(auth_service.sign_in(LoginIn(**_json_body())), 200)


def logout():
    return clear_session_cookie(ok({"signedOut": True}))


def me():
    user = auth_service.get_user(g.user_id)
    if not user:
        abort(401, description="Please sign in")
    return ok(to_public(user))
