from flask import Blueprint

from ..controllers import activity_controller as c
from ..middleware.auth_required import auth_required
from ..middleware.profile_required import profile_required

bp = Blueprint("activity", __name__)


def scoped(view):
    return auth_required(profile_required(view))


bp.put("/progress/<slug>")(scoped(c.save_progress))
bp.get("/continue")(scoped(c.continue_watching))
bp.put("/ratings/<slug>")(scoped(c.rate))
bp.get("/ratings")(scoped(c.my_ratings))
bp.get("/search")(scoped(c.search))
