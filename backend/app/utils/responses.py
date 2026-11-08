"""One response shape for the whole API: {"data": ...} or {"error": ..., "fields"?: ...}."""
from flask import jsonify


def ok(data, status: int = 200, cache_seconds: int | None = None):
    response = jsonify({"data": data})
    response.status_code = status
    if cache_seconds:
        response.headers["Cache-Control"] = f"public, max-age={cache_seconds}, stale-while-revalidate=300"
    else:
        response.headers["Cache-Control"] = "no-store"
    return response


def error(message: str, status: int, **extra):
    response = jsonify({"error": message, **extra})
    response.status_code = status
    return response
