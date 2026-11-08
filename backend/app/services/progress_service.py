"""Watch progress per profile, and the Continue Watching row (one aggregation)."""
from datetime import datetime, timezone

from ..models.collections import progress
from ..models.title_model import CARD_FIELDS, to_card

FINISHED = 0.95  # past 95 % a title leaves Continue Watching


def save(profile: dict, slug: str, position: float, duration: float) -> None:
    progress().update_one(
        {"profile_id": profile["_id"], "slug": slug},
        {"$set": {"position": position, "duration": duration, "updated_at": datetime.now(timezone.utc)}},
        upsert=True,
    )


def continue_watching(profile: dict) -> list[dict]:
    pipeline = [
        {"$match": {"profile_id": profile["_id"], "$expr": {"$lt": ["$position", {"$multiply": ["$duration", FINISHED]}]}}},
        {"$sort": {"updated_at": -1}},
        {"$limit": 20},
        {"$lookup": {"from": "titles", "localField": "slug", "foreignField": "slug",
                     "pipeline": [{"$project": CARD_FIELDS}], "as": "title"}},
        {"$unwind": "$title"},
        {"$project": {"_id": 0, "title": 1, "position": 1, "duration": 1}},
    ]
    return [{**to_card(row["title"]), "progress": round(row["position"] / row["duration"], 3), "position": row["position"]}
            for row in progress().aggregate(pipeline)]


def position_of(profile: dict, slug: str) -> float:
    doc = progress().find_one({"profile_id": profile["_id"], "slug": slug}, {"position": 1, "duration": 1})
    if not doc or doc["position"] >= doc["duration"] * FINISHED:
        return 0.0
    return float(doc["position"])
