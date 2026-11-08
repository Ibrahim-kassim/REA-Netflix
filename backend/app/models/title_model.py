"""Title document shape and the public "card" / "details" projections."""
from ..utils.media_urls import backdrop_urls, poster_urls

# Fields a card needs: one projection reused by browse, top 10, search and My List.
CARD_FIELDS = {"_id": 0, "slug": 1, "title": 1, "year": 1, "maturity": 1, "runtime_min": 1, "genres": 1, "top10_rank": 1}
DETAIL_FIELDS = {**CARD_FIELDS, "description": 1, "credit": 1, "license": 1, "source_url": 1}


def to_card(doc: dict) -> dict:
    """Adds the image URLs the front end needs; keeps documents lean in the database."""
    slug = doc["slug"]
    return {**doc, "poster": poster_urls(slug), "backdrop": backdrop_urls(slug)}
