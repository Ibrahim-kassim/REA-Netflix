"""Loads seed/catalog.json into MongoDB (idempotent upserts). Run: python -m seed.seed"""
import json
from pathlib import Path

from pymongo import UpdateOne

from app.models.collections import genres, titles
from app.models.indexes import ensure_indexes

CATALOG = Path(__file__).with_name("catalog.json")


def _upserts(docs: list[dict]) -> list[UpdateOne]:
    return [UpdateOne({"slug": d["slug"]}, {"$set": d}, upsert=True) for d in docs]


def run() -> None:
    data = json.loads(CATALOG.read_text(encoding="utf-8"))
    ensure_indexes()
    g = genres().bulk_write(_upserts(data["genres"]))
    t = titles().bulk_write(_upserts(data["titles"]))
    print(f"genres: {g.upserted_count} new, {g.modified_count} updated")
    print(f"titles: {t.upserted_count} new, {t.modified_count} updated")


if __name__ == "__main__":
    run()
