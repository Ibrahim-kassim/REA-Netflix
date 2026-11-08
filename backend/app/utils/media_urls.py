"""Builds absolute media URLs (posters/backdrops) from a title slug."""
from ..config import settings

POSTER_SIZES = ("w342", "w780")
BACKDROP_SIZES = ("w780", "w1280")


def _image(kind: str, size: str, slug: str) -> str:
    return f"{settings.media_base_url}/images/{kind}/{size}/{slug}.jpg"


def poster_urls(slug: str) -> dict[str, str]:
    return {size: _image("posters", size, slug) for size in POSTER_SIZES}


def backdrop_urls(slug: str) -> dict[str, str]:
    return {size: _image("backdrops", size, slug) for size in BACKDROP_SIZES}
