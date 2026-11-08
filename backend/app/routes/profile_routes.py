from flask import Blueprint

from ..controllers import profile_controller as c
from ..middleware.auth_required import auth_required

bp = Blueprint("profiles", __name__)

bp.get("/profiles")(auth_required(c.list_profiles))
bp.post("/profiles")(auth_required(c.create))
bp.patch("/profiles/<profile_id>")(auth_required(c.update))
bp.delete("/profiles/<profile_id>")(auth_required(c.delete))
