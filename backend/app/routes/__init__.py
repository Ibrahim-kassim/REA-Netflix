"""Registers every blueprint under /api."""
from flask import Flask

from .activity_routes import bp as activity_bp
from .admin_routes import bp as admin_bp
from .auth_routes import bp as auth_bp
from .browse_routes import bp as browse_bp
from .health_routes import bp as health_bp
from .list_routes import bp as list_bp
from .profile_routes import bp as profile_bp
from .titles_routes import bp as titles_bp


def register_routes(app: Flask) -> None:
    for blueprint in (health_bp, auth_bp, profile_bp, titles_bp, browse_bp, list_bp, activity_bp, admin_bp):
        app.register_blueprint(blueprint, url_prefix="/api")
