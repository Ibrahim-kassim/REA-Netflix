"""HTTP layer for the browse page rows (kids' profiles get kids' rows)."""
from flask import g

from ..services import browse_service
from ..utils.responses import ok


def rows():
    return ok(browse_service.rows(bool(g.profile.get("kids", False))))
