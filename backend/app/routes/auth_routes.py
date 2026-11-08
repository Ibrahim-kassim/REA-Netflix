from flask import Blueprint

from ..config import settings
from ..controllers import auth_controller as c
from ..extensions import limiter
from ..middleware.auth_required import auth_required

bp = Blueprint("auth", __name__)

bp.post("/auth/signup")(limiter.limit(settings.rate_limit_auth)(c.signup))
bp.post("/auth/login")(limiter.limit(settings.rate_limit_auth)(c.login))
bp.post("/auth/logout")(c.logout)
bp.get("/auth/me")(auth_required(c.me))
