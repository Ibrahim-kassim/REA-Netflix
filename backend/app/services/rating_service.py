"""Thumbs up / down per profile (value 0 removes the rating)."""
from datetime import datetime, timezone

from werkzeug.exceptions import NotFound

from ..models.collections import ratings, titles


def rate(profile: dict, slug: str, value: int) -> None:
    if not titles().count_documents({"slug": slug}, limit=1):
        raise NotFound("Title not found")
    key = {"profile_id": profile["_id"], "slug": slug}
    if value == 0:
        ratings().delete_one(key)
    else:
        ratings().update_one(key, {"$set": {"value": value, "at": datetime.now(timezone.utc)}}, upsert=True)


def my_ratings(profile: dict) -> dict[str, int]:
    return {r["slug"]: r["value"] for r in ratings().find({"profile_id": profile["_id"]}, {"slug": 1, "value": 1})}
