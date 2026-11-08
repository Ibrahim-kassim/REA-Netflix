"""Collection accessors: the only place collection names are written."""
from pymongo.collection import Collection

from ..extensions import get_db


def titles() -> Collection:
    return get_db()["titles"]


def genres() -> Collection:
    return get_db()["genres"]


def users() -> Collection:
    return get_db()["users"]


def profiles() -> Collection:
    return get_db()["profiles"]


def progress() -> Collection:
    return get_db()["watch_progress"]


def plays() -> Collection:
    return get_db()["plays"]


def ratings() -> Collection:
    return get_db()["ratings"]
