from flask import Blueprint

from ..controllers import titles_controller as c
from ..middleware.auth_required import auth_required
from ..middleware.profile_required import profile_required

bp = Blueprint("titles", __name__)


def signed_in_profile(view):
    return auth_required(profile_required(view))


bp.get("/titles/top10")(c.top10)  # public: the landing page shows it
bp.get("/titles/featured")(signed_in_profile(c.featured))
bp.get("/titles/new")(signed_in_profile(c.newest))
bp.get("/titles")(auth_required(c.list_titles))
bp.get("/titles/<slug>")(auth_required(c.details))
bp.get("/titles/<slug>/similar")(signed_in_profile(c.similar))
bp.get("/titles/<slug>/preview")(signed_in_profile(c.preview))
bp.get("/titles/<slug>/stream")(signed_in_profile(c.stream))
