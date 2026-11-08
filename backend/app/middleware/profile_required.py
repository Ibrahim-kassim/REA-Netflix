"""@profile_required: the X-Profile-Id header must name a profile of the signed-in account."""
from functools import wraps

from bson import ObjectId
from flask import abort, g, request

from ..models.collections import profiles


def profile_required(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        profile_id = request.headers.get("X-Profile-Id", "")
        if not ObjectId.is_valid(profile_id):
            abort(400, description="Choose a profile first")
        doc = profiles().find_one({"_id": ObjectId(profile_id), "user_id": ObjectId(g.user_id)})
        if not doc:
            abort(403, description="This profile is not yours")
        g.profile = doc
        return view(*args, **kwargs)

    return wrapper
