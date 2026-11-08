from flask import Blueprint

from ..controllers import list_controller as c
from ..middleware.auth_required import auth_required
from ..middleware.profile_required import profile_required

bp = Blueprint("my_list", __name__)


def scoped(view):
    return auth_required(profile_required(view))


bp.get("/list")(scoped(c.get_list))
bp.put("/list/<slug>")(scoped(c.add))
bp.delete("/list/<slug>")(scoped(c.remove))
