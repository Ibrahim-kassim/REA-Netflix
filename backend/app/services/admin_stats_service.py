"""Dashboard numbers in a handful of aggregations (counts, daily series, top titles)."""
from datetime import datetime, timedelta, timezone

from pymongo.collection import Collection

from ..models.collections import plays, profiles, progress, titles, users


def _since(days: int) -> datetime:
    return datetime.now(timezone.utc) - timedelta(days=days)


def _daily(collection: Collection, field: str, days: int = 14) -> list[dict]:
    pipeline = [
        {"$match": {field: {"$gte": _since(days)}}},
        {"$group": {"_id": {"$dateTrunc": {"date": f"${field}", "unit": "day"}}, "count": {"$sum": 1}}},
    ]
    found = {row["_id"].date().isoformat(): row["count"] for row in collection.aggregate(pipeline)}
    today = datetime.now(timezone.utc).date()
    days_list = [(today - timedelta(days=i)).isoformat() for i in reversed(range(days))]
    return [{"day": day, "count": found.get(day, 0)} for day in days_list]


def _top_titles(days: int = 7, limit: int = 5) -> list[dict]:
    pipeline = [
        {"$match": {"at": {"$gte": _since(days)}}},
        {"$group": {"_id": "$slug", "plays": {"$sum": 1}}},
        {"$sort": {"plays": -1}},
        {"$limit": limit},
        {"$lookup": {"from": "titles", "localField": "_id", "foreignField": "slug",
                     "pipeline": [{"$project": {"_id": 0, "title": 1}}], "as": "t"}},
        {"$project": {"_id": 0, "slug": "$_id", "plays": 1, "title": {"$first": "$t.title"}}},
    ]
    return list(plays().aggregate(pipeline))


def _watch_hours() -> float:
    total = next(progress().aggregate([{"$group": {"_id": None, "s": {"$sum": "$position"}}}]), {"s": 0})["s"]
    return round(total / 3600, 1)


def stats() -> dict:
    return {
        "users": users().count_documents({}),
        "profiles": profiles().count_documents({}),
        "titles": titles().count_documents({}),
        "plays7d": plays().count_documents({"at": {"$gte": _since(7)}}),
        "playsToday": plays().count_documents({"at": {"$gte": _since(1)}}),
        "watchHours": _watch_hours(),
        "signupsByDay": _daily(users(), "created_at"),
        "playsByDay": _daily(plays(), "at"),
        "topTitles": _top_titles(),
        "hasSampleData": users().count_documents({"sample": True}, limit=1) > 0,
    }
