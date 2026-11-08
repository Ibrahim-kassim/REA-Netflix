"""Validated bodies for profiles, progress and ratings."""
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Avatar = Literal["violet", "pink", "amber", "teal", "blue", "lime"]


class _Strict(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class ProfileIn(_Strict):
    name: str = Field(min_length=1, max_length=20, pattern=r"^[\w\s.'-]+$")
    avatar: Avatar = "violet"
    kids: bool = False


class ProfilePatch(_Strict):
    name: str | None = Field(default=None, min_length=1, max_length=20, pattern=r"^[\w\s.'-]+$")
    avatar: Avatar | None = None
    kids: bool | None = None


class ProgressIn(_Strict):
    position: float = Field(ge=0, le=86_400)
    duration: float = Field(gt=0, le=86_400)


class RatingIn(_Strict):
    value: Literal[-1, 0, 1]


class SearchQuery(BaseModel):
    model_config = ConfigDict(extra="ignore", str_strip_whitespace=True)
    q: str = Field(min_length=1, max_length=60)
