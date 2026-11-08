"""Accounts: Argon2id password hashing, sign-up (with a first profile) and sign-in."""
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError
from bson import ObjectId
from pymongo.errors import DuplicateKeyError
from werkzeug.exceptions import Conflict, Forbidden, Unauthorized

from ..models.collections import users
from ..models.user_model import PUBLIC_FIELDS, new_user
from ..schemas.auth_schemas import LoginIn, SignupIn
from .profile_service import ensure_first

_hasher = PasswordHasher()  # Argon2id with the library's current recommended parameters
_DUMMY_HASH = _hasher.hash("timing-equaliser")


def hash_password(password: str) -> str:
    return _hasher.hash(password)


def sign_up(data: SignupIn) -> dict:
    doc = new_user(data.email, data.name, hash_password(data.password))
    try:
        doc["_id"] = users().insert_one(doc).inserted_id
    except DuplicateKeyError:
        raise Conflict("An account with this email already exists")
    ensure_first(doc["_id"], data.name)
    return doc


def sign_in(data: LoginIn) -> dict:
    doc = users().find_one({"email": data.email})
    try:  # verify even when the user is missing, so timing doesn't reveal accounts
        _hasher.verify(doc["password_hash"] if doc else _DUMMY_HASH, data.password)
    except VerificationError:
        raise Unauthorized("Wrong email or password")
    if not doc:
        raise Unauthorized("Wrong email or password")
    if doc.get("disabled"):
        raise Forbidden("This account is disabled")
    ensure_first(doc["_id"], doc["name"])
    return doc


def get_user(user_id: str) -> dict | None:
    if not ObjectId.is_valid(user_id):
        return None
    doc = users().find_one({"_id": ObjectId(user_id)}, PUBLIC_FIELDS)
    return None if not doc or doc.get("disabled") else doc
