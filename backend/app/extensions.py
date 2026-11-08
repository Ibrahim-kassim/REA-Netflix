"""Shared extension objects, created once and bound to the app in create_app()."""
from flask_caching import Cache
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pymongo import MongoClient
from pymongo.database import Database

from .config import settings

cache = Cache()
cors = CORS()
limiter = Limiter(key_func=get_remote_address, default_limits=[settings.rate_limit_default])

_client = MongoClient(settings.mongo_uri, maxPoolSize=50, serverSelectionTimeoutMS=5000, tz_aware=True)


def get_db() -> Database:
    """The one database handle; PyMongo pools connections internally."""
    return _client[settings.mongo_db]
