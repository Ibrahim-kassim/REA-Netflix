"""HTTP layer for what a profile does: progress, Continue Watching, likes and search."""
from flask import g, request

from ..schemas.profile_schemas import ProgressIn, RatingIn, SearchQuery
from ..services import progress_service, rating_service, search_service
from ..utils.json_safe import safe_slug
from ..utils.responses import ok


def save_progress(slug: str):
    data = ProgressIn(**(request.get_json(silent=True) or {}))
    progress_service.save(g.profile, safe_slug(slug), data.position, data.duration)
    return ok({"saved": True})


def continue_watching():
    return ok(progress_service.continue_watching(g.profile))


def rate(slug: str):
    data = RatingIn(**(request.get_json(silent=True) or {}))
    rating_service.rate(g.profile, safe_slug(slug), data.value)
    return ok({"slug": slug, "value": data.value})


def my_ratings():
    return ok(rating_service.my_ratings(g.profile))


def search():
    query = SearchQuery(**request.args.to_dict())
    return ok(search_service.search(query.q, bool(g.profile.get("kids", False))))
