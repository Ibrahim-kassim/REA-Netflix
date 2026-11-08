"""Application factory: config, extensions, security, routes, errors."""
from flask import Flask

from .config import settings
from .extensions import cache, cors, limiter
from .middleware.error_handlers import register_error_handlers
from .middleware.security_headers import register_security_headers
from .models.indexes import ensure_indexes
from .routes import register_routes


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.update(
        PORT=settings.port,
        JSON_SORT_KEYS=False,
        MAX_CONTENT_LENGTH=64 * 1024,  # API bodies are small JSON documents
        CACHE_TYPE="SimpleCache",
        CACHE_DEFAULT_TIMEOUT=settings.cache_ttl,
    )
    cache.init_app(app)
    limiter.init_app(app)
    cors.init_app(app, origins=list(settings.cors_origins), supports_credentials=True)
    register_security_headers(app)
    register_error_handlers(app)
    register_routes(app)
    ensure_indexes()
    return app
