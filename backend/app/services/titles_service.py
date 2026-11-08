"""Title queries: top 10, featured, details, similar, newest and paginated lists (index-backed, cached)."""
from werkzeug.exceptions import NotFound

from ..extensions import cache
from ..models.collections import titles
from ..models.profile_model import maturity_filter
from ..models.title_model import CARD_FIELDS, DETAIL_FIELDS, to_card
from ..schemas.query_schemas import TitlesQuery


@cache.memoize()
def top10(kids: bool = False) -> list[dict]:
    cursor = titles().find({"top10_rank": {"$ne": None}, **maturity_filter(kids)}, CARD_FIELDS).sort("top10_rank", 1)
    return [to_card(doc) for doc in cursor.limit(10)]


@cache.memoize()
def featured(kids: bool = False) -> dict:
    base = maturity_filter(kids)
    doc = titles().find_one({"featured": True, **base}, DETAIL_FIELDS) or titles().find_one(base, DETAIL_FIELDS)
    if not doc:
        raise NotFound("No titles yet")
    return to_card(doc)


@cache.memoize()
def details(slug: str) -> dict:
    doc = titles().find_one({"slug": slug}, DETAIL_FIELDS)
    if not doc:
        raise NotFound("Title not found")
    return to_card(doc)


@cache.memoize()
def similar(slug: str, kids: bool = False) -> list[dict]:
    """More Like This: titles sharing the most genres, in one aggregation."""
    source = titles().find_one({"slug": slug}, {"genres": 1})
    if not source:
        raise NotFound("Title not found")
    pipeline = [
        {"$match": {"slug": {"$ne": slug}, "genres": {"$in": source["genres"]}, **maturity_filter(kids)}},
        {"$addFields": {"overlap": {"$size": {"$setIntersection": ["$genres", source["genres"]]}}}},
        {"$sort": {"overlap": -1, "popularity": -1}},
        {"$limit": 9},
        {"$project": CARD_FIELDS},
    ]
    return [to_card(doc) for doc in titles().aggregate(pipeline)]


@cache.memoize()
def newest(kids: bool = False) -> list[dict]:
    cursor = titles().find(maturity_filter(kids), CARD_FIELDS).sort([("year", -1), ("popularity", -1)]).limit(20)
    return [to_card(doc) for doc in cursor]


def page(query: TitlesQuery) -> dict:
    """Keyset pagination on popularity: no skip(), so deep pages stay fast."""
    filters: dict = {"genres": query.genre} if query.genre else {}
    if query.after is not None:
        filters["popularity"] = {"$lt": query.after}
    fields = {**CARD_FIELDS, "popularity": 1}
    docs = list(titles().find(filters, fields).sort("popularity", -1).limit(query.limit))
    cursor = docs[-1]["popularity"] if len(docs) == query.limit else None
    return {"items": [to_card({k: v for k, v in d.items() if k != "popularity"}) for d in docs], "next": cursor}
