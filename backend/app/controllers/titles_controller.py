"""HTTP layer for titles: public top 10; profile-aware featured, similar, newest; signed video links."""
from flask import g, request

from ..config import settings
from ..schemas.query_schemas import TitlesQuery
from ..services import media_service, play_service, progress_service, titles_service
from ..utils.json_safe import safe_slug
from ..utils.responses import ok


def _kids() -> bool:
    return bool(getattr(g, "profile", {}).get("kids", False))


def top10():
    return ok(titles_service.top10(request.args.get("kids") == "1"), cache_seconds=settings.cache_ttl)


def featured():
    return ok(titles_service.featured(_kids()))


def details(slug: str):
    return ok(titles_service.details(safe_slug(slug)))


def similar(slug: str):
    return ok(titles_service.similar(safe_slug(slug), _kids()))


def newest():
    return ok(titles_service.newest(_kids()))


def list_titles():
    return ok(titles_service.page(TitlesQuery(**request.args.to_dict())))


def preview(slug: str):
    """Muted autoplay previews (billboard, modal): a signed link that is not counted as a play."""
    titles_service.details(safe_slug(slug))
    return ok(media_service.signed_video_url(slug))


def stream(slug: str):
    titles_service.details(safe_slug(slug))  # 404 for unknown titles before signing anything
    play_service.record(g.user_id, g.profile, slug)
    link = media_service.signed_video_url(slug)
    return ok({**link, "resumeAt": progress_service.position_of(g.profile, slug)})
