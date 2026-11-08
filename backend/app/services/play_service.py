"""Play events (one per started playback): the admin dashboard's analytics source."""
from datetime import datetime, timezone

from bson import ObjectId

from ..models.collections import plays


def record(user_id: str, profile: dict, slug: str) -> None:
    plays().insert_one({"user_id": ObjectId(user_id), "profile_id": profile["_id"], "slug": slug,
                        "at": datetime.now(timezone.utc)})
