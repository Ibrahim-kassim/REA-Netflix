"""HTTP layer for profiles (Who's watching?)."""
from flask import g, request

from ..schemas.profile_schemas import ProfileIn, ProfilePatch
from ..services import profile_service
from ..utils.responses import ok


def list_profiles():
    return ok(profile_service.list_profiles(g.user_id))


def create():
    return ok(profile_service.create(g.user_id, ProfileIn(**(request.get_json(silent=True) or {}))), 201)


def update(profile_id: str):
    data = ProfilePatch(**(request.get_json(silent=True) or {}))
    return ok(profile_service.update(g.user_id, profile_id, data))


def delete(profile_id: str):
    profile_service.delete(g.user_id, profile_id)
    return ok({"deleted": profile_id})
