"""User document helpers: creation shape and the public projection."""
from datetime import datetime, timezone

PUBLIC_FIELDS = {"_id": 1, "email": 1, "name": 1, "role": 1, "disabled": 1, "created_at": 1}
ROLES = ("user", "admin")


def new_user(email: str, name: str, password_hash: str, role: str = "user") -> dict:
    return {
        "email": email,
        "name": name,
        "password_hash": password_hash,
        "role": role,
        "disabled": False,
        "created_at": datetime.now(timezone.utc),
    }


def to_public(doc: dict) -> dict:
    return {"id": str(doc["_id"]), "email": doc["email"], "name": doc["name"], "role": doc.get("role", "user")}
