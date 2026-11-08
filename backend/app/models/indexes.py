"""Indexes that keep every query an index lookup (idempotent; safe on each start)."""
import logging

from pymongo import ASCENDING, DESCENDING, TEXT
from pymongo.errors import PyMongoError

from .collections import genres, plays, profiles, progress, ratings, titles, users

log = logging.getLogger(__name__)


def ensure_indexes() -> None:
    try:
        titles().create_index("slug", unique=True)
        titles().create_index([("genres", ASCENDING), ("popularity", DESCENDING)])
        titles().create_index("top10_rank", sparse=True)
        titles().create_index("featured", sparse=True)
        titles().create_index([("title", TEXT), ("description", TEXT)], name="title_text")
        genres().create_index("slug", unique=True)
        genres().create_index("order")
        users().create_index("email", unique=True)
        users().create_index("created_at")
        profiles().create_index("user_id")
        progress().create_index([("profile_id", ASCENDING), ("slug", ASCENDING)], unique=True)
        progress().create_index([("profile_id", ASCENDING), ("updated_at", DESCENDING)])
        plays().create_index([("at", DESCENDING)])
        plays().create_index([("slug", ASCENDING), ("at", DESCENDING)])
        plays().create_index("user_id")
        ratings().create_index([("profile_id", ASCENDING), ("slug", ASCENDING)], unique=True)
    except PyMongoError as exc:  # the API still starts; health shows the DB state
        log.warning("Could not create indexes: %s", exc)
