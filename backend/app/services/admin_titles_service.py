"""Catalogue management for admins: list with play counts, create, edit, delete."""
from pymongo.errors import DuplicateKeyError
from werkzeug.exceptions import Conflict, NotFound

from ..extensions import cache
from ..models.collections import titles
from ..models.title_model import DETAIL_FIELDS, to_card
from ..schemas.admin_schemas import TitleIn, TitlePatch


def list_all() -> list[dict]:
    pipeline = [
        {"$sort": {"popularity": -1}},
        {"$lookup": {"from": "plays", "localField": "slug", "foreignField": "slug",
                     "pipeline": [{"$count": "n"}], "as": "p"}},
        {"$project": {**DETAIL_FIELDS, "featured": 1, "popularity": 1,
                      "plays": {"$ifNull": [{"$first": "$p.n"}, 0]}}},
    ]
    return [to_card(doc) for doc in titles().aggregate(pipeline)]


def create(data: TitleIn) -> dict:
    doc = data.model_dump(mode="json")
    try:
        titles().insert_one(doc)
    except DuplicateKeyError:
        raise Conflict("A title with this slug already exists")
    cache.clear()
    return to_card({k: v for k, v in doc.items() if k != "_id"})


def update(slug: str, data: TitlePatch) -> dict:
    current = titles().find_one({"slug": slug}, {"top10_rank": 1})
    if not current:
        raise NotFound("Title not found")
    changes = data.model_dump(exclude_none=True)
    if "top10_rank" in data.model_fields_set and data.top10_rank is None:
        changes["top10_rank"] = None  # an explicit null takes the title out of the Top 10
    if changes.get("featured"):
        titles().update_many({"featured": True}, {"$set": {"featured": False}})  # one billboard title
    if changes.get("top10_rank"):  # one title per position: the title holding it swaps places
        titles().update_many({"top10_rank": changes["top10_rank"], "slug": {"$ne": slug}},
                             {"$set": {"top10_rank": current.get("top10_rank")}})
    titles().update_one({"slug": slug}, {"$set": changes})
    cache.clear()
    return to_card(titles().find_one({"slug": slug}, {**DETAIL_FIELDS, "featured": 1, "popularity": 1}))


def delete(slug: str) -> None:
    if not titles().delete_one({"slug": slug}).deleted_count:
        raise NotFound("Title not found")
    cache.clear()
