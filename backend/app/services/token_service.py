"""JWT session tokens carried in an httpOnly cookie (never readable by page scripts)."""
from datetime import datetime, timedelta, timezone

import jwt
from flask import Response

from ..config import settings

COOKIE_NAME = "reaflix_session"
_ALGORITHM = "HS256"


def issue_token(user_id: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {"sub": user_id, "iat": now, "exp": now + timedelta(minutes=settings.jwt_expires_minutes)}
    return jwt.encode(payload, settings.jwt_secret, algorithm=_ALGORITHM)


def decode_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, settings.jwt_secret, algorithms=[_ALGORITHM], options={"require": ["exp", "sub"]})
    except jwt.PyJWTError:
        return None


def set_session_cookie(response: Response, token: str) -> Response:
    response.set_cookie(
        COOKIE_NAME, token, max_age=settings.jwt_expires_minutes * 60, httponly=True,
        secure=settings.cookie_secure, samesite="Lax", path="/",
    )
    return response


def clear_session_cookie(response: Response) -> Response:
    response.delete_cookie(COOKIE_NAME, path="/", samesite="Lax")
    return response
