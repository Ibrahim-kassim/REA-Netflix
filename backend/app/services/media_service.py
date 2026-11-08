"""Short-lived signed video URLs (HMAC-SHA256), verified by the Node media server."""
import base64
import hashlib
import hmac
import time

from ..config import settings


def _sign(path: str, expires: int) -> str:
    digest = hmac.new(settings.media_signing_secret.encode(), f"{path}:{expires}".encode(), hashlib.sha256).digest()
    return base64.urlsafe_b64encode(digest).rstrip(b"=").decode()


def signed_video_url(slug: str) -> dict:
    expires = int(time.time()) + settings.signed_url_ttl
    path = f"/videos/{slug}"
    return {"url": f"{settings.media_base_url}{path}?exp={expires}&sig={_sign(path, expires)}", "expiresAt": expires}
