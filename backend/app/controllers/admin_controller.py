"""HTTP layer for the admin dashboard (every route is admin-only)."""
from flask import g, request

from ..schemas.admin_schemas import PageQuery, TitleIn, TitlePatch, UserPatch
from ..services import admin_stats_service, admin_titles_service, admin_users_service
from ..utils.json_safe import safe_slug
from ..utils.responses import ok


def _body() -> dict:
    return request.get_json(silent=True) or {}


def stats():
    return ok(admin_stats_service.stats())


def list_titles():
    return ok(admin_titles_service.list_all())


def create_title():
    return ok(admin_titles_service.create(TitleIn(**_body())), 201)


def update_title(slug: str):
    return ok(admin_titles_service.update(safe_slug(slug), TitlePatch(**_body())))


def delete_title(slug: str):
    admin_titles_service.delete(safe_slug(slug))
    return ok({"deleted": slug})


def list_users():
    return ok(admin_users_service.list_users(PageQuery(**request.args.to_dict())))


def update_user(user_id: str):
    return ok(admin_users_service.update_user(g.user_id, user_id, UserPatch(**_body())))
