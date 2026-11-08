"""Profiles: list, create (max 5), rename/recolour, delete — always scoped to the owner."""
from bson import ObjectId
from werkzeug.exceptions import BadRequest, NotFound

from ..models.collections import profiles, progress, ratings
from ..models.profile_model import MAX_PROFILES, new_profile, to_public
from ..schemas.profile_schemas import ProfileIn, ProfilePatch


def _owned(user_id: str, profile_id: str) -> dict:
    if not ObjectId.is_valid(profile_id):
        raise NotFound("Profile not found")
    doc = profiles().find_one({"_id": ObjectId(profile_id), "user_id": ObjectId(user_id)})
    if not doc:
        raise NotFound("Profile not found")
    return doc


def list_profiles(user_id: str) -> list[dict]:
    return [to_public(p) for p in profiles().find({"user_id": ObjectId(user_id)}).sort("created_at", 1)]


def create(user_id: str, data: ProfileIn) -> dict:
    if profiles().count_documents({"user_id": ObjectId(user_id)}) >= MAX_PROFILES:
        raise BadRequest(f"An account can have up to {MAX_PROFILES} profiles")
    doc = new_profile(ObjectId(user_id), data.name, data.avatar, data.kids)
    doc["_id"] = profiles().insert_one(doc).inserted_id
    return to_public(doc)


def update(user_id: str, profile_id: str, data: ProfilePatch) -> dict:
    doc = _owned(user_id, profile_id)
    changes = data.model_dump(exclude_none=True)
    if changes:
        profiles().update_one({"_id": doc["_id"]}, {"$set": changes})
    return to_public({**doc, **changes})


def delete(user_id: str, profile_id: str) -> None:
    doc = _owned(user_id, profile_id)
    if profiles().count_documents({"user_id": ObjectId(user_id)}) <= 1:
        raise BadRequest("Keep at least one profile")
    profiles().delete_one({"_id": doc["_id"]})
    progress().delete_many({"profile_id": doc["_id"]})
    ratings().delete_many({"profile_id": doc["_id"]})


def ensure_first(user_id: ObjectId, name: str) -> None:
    """Every new account starts with one profile named after its owner."""
    if not profiles().count_documents({"user_id": user_id}, limit=1):
        profiles().insert_one(new_profile(user_id, name.split()[0][:20], "violet", False))
