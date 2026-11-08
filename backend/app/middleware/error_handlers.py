"""Uniform JSON errors; internal details never leave the server."""
import logging

from flask import Flask
from pydantic import ValidationError
from werkzeug.exceptions import HTTPException

from ..utils.responses import error

log = logging.getLogger(__name__)


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(ValidationError)
    def _validation(exc: ValidationError):
        fields = {".".join(str(p) for p in e["loc"]): e["msg"] for e in exc.errors()}
        return error("Invalid input", 422, fields=fields)

    @app.errorhandler(HTTPException)
    def _http(exc: HTTPException):
        return error(exc.description or exc.name, exc.code or 500)

    @app.errorhandler(Exception)
    def _unexpected(exc: Exception):
        log.exception("Unhandled error: %s", exc)
        return error("Internal server error", 500)
