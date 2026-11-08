"""Strict security headers on every API response (the API only ever returns JSON)."""
from flask import Flask, Response

from ..config import settings

_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
}


def register_security_headers(app: Flask) -> None:
    @app.after_request
    def _apply(response: Response) -> Response:
        response.headers.update(_HEADERS)
        if settings.cookie_secure:
            response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"
        return response
