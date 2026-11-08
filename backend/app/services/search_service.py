"""Search titles by name, description or genre (input is escaped: no regex injection)."""
import re

from ..models.collections import titles
from ..models.profile_model import maturity_filter
from ..models.title_model import CARD_FIELDS, to_card


def search(query: str, kids: bool) -> list[dict]:
    pattern = {"$regex": re.escape(query), "$options": "i"}
    filters = {"$or": [{"title": pattern}, {"description": pattern}, {"genres": pattern}], **maturity_filter(kids)}
    cursor = titles().find(filters, CARD_FIELDS).sort("popularity", -1).limit(30)
    return [to_card(doc) for doc in cursor]
