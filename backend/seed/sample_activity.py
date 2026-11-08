"""Sample viewers and plays so the dashboard has numbers (marked sample=True). Run: python -m seed.sample_activity"""
import random
from datetime import datetime, timedelta, timezone

from app.models.collections import plays, profiles, progress, titles, users
from app.models.profile_model import AVATARS, new_profile
from app.models.user_model import new_user

NAMES = ["Lina", "Omar", "Sara", "Karim", "Maya", "Hadi", "Nour", "Ziad", "Rana", "Fadi", "Dana", "Sami"]


def run(count: int = 36, seed: int = 7) -> None:
    rng = random.Random(seed)  # same data on every run
    users().delete_many({"sample": True})
    now = datetime.now(timezone.utc)
    slugs = [t["slug"] for t in titles().find({}, {"slug": 1, "popularity": 1}).sort("popularity", -1)]
    weights = list(range(len(slugs), 0, -1))  # popular titles are played more
    for i in range(count):
        joined = now - timedelta(days=rng.randint(0, 13), hours=rng.randint(0, 23))
        user = {**new_user(f"viewer{i + 1}@sample.reaflix.io", rng.choice(NAMES), "!sample-account-no-login"),
                "created_at": joined, "sample": True}
        user_id = users().insert_one(user).inserted_id
        profile = {**new_profile(user_id, user["name"], rng.choice(AVATARS), False), "sample": True}
        profile_id = profiles().insert_one(profile).inserted_id
        for _ in range(rng.randint(1, 9)):
            slug = rng.choices(slugs, weights)[0]
            at = joined + timedelta(hours=rng.randint(0, max(1, int((now - joined).total_seconds() // 3600))))
            plays().insert_one({"user_id": user_id, "profile_id": profile_id, "slug": slug, "at": min(at, now), "sample": True})
            progress().update_one({"profile_id": profile_id, "slug": slug},
                                  {"$set": {"position": rng.uniform(60, 900), "duration": 900.0, "updated_at": min(at, now)}},
                                  upsert=True)
    print(f"sample viewers: {count}, plays: {plays().count_documents({'sample': True})}")


if __name__ == "__main__":
    run()
