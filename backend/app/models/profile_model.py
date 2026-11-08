"""Viewer profiles (up to 5 per account), each with its own list, likes and progress."""
from datetime import datetime, timezone

from bson import ObjectId

AVATARS = ("violet", "pink", "amber", "teal", "blue", "lime")
KIDS_MATURITIES = ("All ages", "7+")
MAX_PROFILES = 5


def new_profile(user_id: ObjectId, name: str, avatar: str, kids: bool) -> dict:
    return {"user_id": user_id, "name": name, "avatar": avatar, "kids": kids, "my_list": [],
            "created_at": datetime.now(timezone.utc)}


def to_public(doc: dict) -> dict:
    return {"id": str(doc["_id"]), "name": doc["name"], "avatar": doc["avatar"], "kids": doc.get("kids", False),
            "myList": doc.get("my_list", [])}


def maturity_filter(kids: bool) -> dict:
    """Mongo filter that hides grown-up titles from kids' profiles."""
    return {"maturity": {"$in": list(KIDS_MATURITIES)}} if kids else {}
