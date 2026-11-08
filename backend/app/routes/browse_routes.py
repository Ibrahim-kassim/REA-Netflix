from flask import Blueprint

from ..controllers import browse_controller as c
from ..middleware.auth_required import auth_required
from ..middleware.profile_required import profile_required

bp = Blueprint("browse", __name__)

bp.get("/browse")(auth_required(profile_required(c.rows)))
