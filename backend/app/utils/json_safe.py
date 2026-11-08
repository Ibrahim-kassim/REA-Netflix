"""Rejects MongoDB operators or odd characters hidden in path input (NoSQL-injection guard)."""
import re

from werkzeug.exceptions import BadRequest

SLUG = re.compile(r"^[a-z0-9-]{1,80}$")


def safe_slug(value: str) -> str:
    if not isinstance(value, str) or not SLUG.match(value):
        raise BadRequest("Invalid title id")
    return value
