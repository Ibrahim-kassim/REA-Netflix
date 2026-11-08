from flask import Blueprint

from ..extensions import get_db, limiter
from ..utils.responses import error, ok

bp = Blueprint("health", __name__)


@bp.get("/health")
@limiter.exempt
def health():
    try:
        get_db().command("ping")
        return ok({"status": "ok", "database": "up"})
    except Exception:  # report, don't leak details
        return error("Database unavailable", 503)
