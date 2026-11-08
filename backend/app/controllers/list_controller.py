"""HTTP layer for My List (per profile)."""
from flask import g

from ..services import list_service
from ..utils.json_safe import safe_slug
from ..utils.responses import ok


def get_list():
    return ok(list_service.my_list(g.profile))


def add(slug: str):
    list_service.add(g.profile, safe_slug(slug))
    return ok({"added": slug}, 201)


def remove(slug: str):
    list_service.remove(g.profile, safe_slug(slug))
    return ok({"removed": slug})
