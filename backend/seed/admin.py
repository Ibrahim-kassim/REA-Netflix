"""Creates or refreshes the admin account from ADMIN_EMAIL / ADMIN_PASSWORD in .env. Run: python -m seed.admin"""
import os

from app.models.collections import users
from app.models.indexes import ensure_indexes
from app.models.user_model import new_user
from app.services.auth_service import hash_password
from app.services.profile_service import ensure_first


def run() -> None:
    email, password = os.environ["ADMIN_EMAIL"].lower(), os.environ["ADMIN_PASSWORD"]
    ensure_indexes()
    existing = users().find_one({"email": email})
    if existing:
        users().update_one({"_id": existing["_id"]},
                           {"$set": {"role": "admin", "disabled": False, "password_hash": hash_password(password)}})
        user_id = existing["_id"]
    else:
        user_id = users().insert_one(new_user(email, "Admin", hash_password(password), role="admin")).inserted_id
    ensure_first(user_id, "Admin")
    print(f"admin ready: {email}")


if __name__ == "__main__":
    run()
