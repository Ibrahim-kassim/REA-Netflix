"""@admin_required: the role is read from the database on every call (never trusted from the token)."""
from functools import wraps

from bson import ObjectId
from flask import abort, g

from ..models.collections import users


def admin_required(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        user = users().find_one({"_id": ObjectId(g.user_id)}, {"role": 1, "disabled": 1})
        if not user or user.get("role") != "admin" or user.get("disabled"):
            abort(403, description="Admins only")
        return view(*args, **kwargs)

    return wrapper
