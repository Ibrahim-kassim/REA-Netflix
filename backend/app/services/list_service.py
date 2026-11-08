"""My List per profile: slugs on the profile, titles resolved with one $lookup (no N+1)."""
from werkzeug.exceptions import NotFound

from ..models.collections import profiles, titles
from ..models.profile_model import maturity_filter
from ..models.title_model import CARD_FIELDS, to_card


def my_list(profile: dict) -> list[dict]:
    pipeline = [
        {"$match": {"_id": profile["_id"]}},
        {"$lookup": {"from": "titles", "localField": "my_list", "foreignField": "slug",
                     "pipeline": [{"$match": maturity_filter(profile.get("kids", False))}, {"$project": CARD_FIELDS}],
                     "as": "titles"}},
        {"$project": {"_id": 0, "titles": 1}},
    ]
    found = next(profiles().aggregate(pipeline), {"titles": []})
    return [to_card(t) for t in found["titles"]]


def add(profile: dict, slug: str) -> None:
    if not titles().count_documents({"slug": slug}, limit=1):
        raise NotFound("Title not found")
    profiles().update_one({"_id": profile["_id"]}, {"$addToSet": {"my_list": slug}})


def remove(profile: dict, slug: str) -> None:
    profiles().update_one({"_id": profile["_id"]}, {"$pull": {"my_list": slug}})
