"""Settings read once from the environment (.env), validated and typed."""
import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


def _required(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def _list(value: str) -> list[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    port: int = int(os.getenv("PORT", "5001"))
    mongo_uri: str = _required("MONGO_URI")
    mongo_db: str = os.getenv("MONGO_DB", "reaflix")
    jwt_secret: str = _required("JWT_SECRET")
    jwt_expires_minutes: int = int(os.getenv("JWT_EXPIRES_MINUTES", "1440"))
    cookie_secure: bool = os.getenv("COOKIE_SECURE", "false").lower() == "true"
    cors_origins: tuple[str, ...] = tuple(_list(_required("CORS_ORIGINS")))
    media_base_url: str = _required("MEDIA_BASE_URL").rstrip("/")
    media_signing_secret: str = _required("MEDIA_SIGNING_SECRET")
    signed_url_ttl: int = int(os.getenv("SIGNED_URL_TTL_SECONDS", "3600"))
    cache_ttl: int = int(os.getenv("CACHE_TTL_SECONDS", "60"))
    rate_limit_default: str = os.getenv("RATE_LIMIT_DEFAULT", "300 per minute")
    rate_limit_auth: str = os.getenv("RATE_LIMIT_AUTH", "10 per minute")


settings = Settings()
