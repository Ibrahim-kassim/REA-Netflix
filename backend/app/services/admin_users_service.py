"""Account management for admins: list with profile and play counts (no N+1), change role or access."""
from bson import ObjectId
from werkzeug.exceptions import BadRequest, NotFound

from ..models.collections import users
from ..schemas.admin_schemas import PageQuery, UserPatch


def _count(collection: str, field: str) -> dict:
    return {"from": collection, "localField": "_id", "foreignField": field, "pipeline": [{"$count": "n"}], "as": collection}


def list_users(query: PageQuery) -> dict:
    pipeline = [
        {"$sort": {"created_at": -1}},
        {"$skip": (query.page - 1) * query.limit},
        {"$limit": query.limit},
        {"$lookup": _count("profiles", "user_id")},
        {"$lookup": _count("plays", "user_id")},
        {"$project": {"_id": 0, "id": {"$toString": "$_id"}, "email": 1, "name": 1, "role": 1, "disabled": 1,
                      "sample": 1, "created_at": 1,
                      "profiles": {"$ifNull": [{"$first": "$profiles.n"}, 0]},
                      "plays": {"$ifNull": [{"$first": "$plays.n"}, 0]}}},
    ]
    return {"items": list(users().aggregate(pipeline)), "total": users().count_documents({}), "page": query.page}


def update_user(admin_id: str, user_id: str, data: UserPatch) -> dict:
    if not ObjectId.is_valid(user_id):
        raise NotFound("User not found")
    if user_id == admin_id and (data.role == "user" or data.disabled):
        raise BadRequest("You can't remove your own admin access")
    changes = data.model_dump(exclude_none=True)
    result = users().find_one_and_update({"_id": ObjectId(user_id)}, {"$set": changes},
                                         projection={"email": 1, "role": 1, "disabled": 1}, return_document=True)
    if not result:
        raise NotFound("User not found")
    return {"id": user_id, "email": result["email"], "role": result.get("role"), "disabled": result.get("disabled")}
