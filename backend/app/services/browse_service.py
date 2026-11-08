"""Browse rows in ONE aggregation (genres → $lookup titles): no N+1 queries."""
from ..extensions import cache
from ..models.collections import genres
from ..models.profile_model import maturity_filter
from ..models.title_model import CARD_FIELDS, to_card

_ROW_SIZE = 20


def _pipeline(kids: bool) -> list[dict]:
    return [
        {"$sort": {"order": 1}},
        {"$lookup": {
            "from": "titles",
            "let": {"genre": "$slug"},
            "pipeline": [
                {"$match": {"$expr": {"$in": ["$$genre", "$genres"]}, **maturity_filter(kids)}},
                {"$sort": {"popularity": -1}},
                {"$limit": _ROW_SIZE},
                {"$project": CARD_FIELDS},
            ],
            "as": "titles",
        }},
        {"$match": {"titles.0": {"$exists": True}}},
        {"$project": {"_id": 0, "slug": 1, "name": 1, "titles": 1}},
    ]


@cache.memoize()
def rows(kids: bool = False) -> list[dict]:
    result = genres().aggregate(_pipeline(kids))
    return [{**row, "titles": [to_card(t) for t in row["titles"]]} for row in result]
