from flask import Blueprint

from ..controllers import admin_controller as c
from ..middleware.admin_required import admin_required
from ..middleware.auth_required import auth_required

bp = Blueprint("admin", __name__)


def admin(view):
    return auth_required(admin_required(view))


bp.get("/admin/stats")(admin(c.stats))
bp.get("/admin/titles")(admin(c.list_titles))
bp.post("/admin/titles")(admin(c.create_title))
bp.patch("/admin/titles/<slug>")(admin(c.update_title))
bp.delete("/admin/titles/<slug>")(admin(c.delete_title))
bp.get("/admin/users")(admin(c.list_users))
bp.patch("/admin/users/<user_id>")(admin(c.update_user))
