"""Validated admin inputs: title metadata, user changes and paging."""
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, HttpUrl

Maturity = Literal["All ages", "7+", "13+", "16+", "18+"]
Genre = Literal["animation", "sci-fi", "comedy", "action", "fantasy", "family", "drama", "horror"]


class _Strict(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class TitlePatch(_Strict):
    title: str | None = Field(default=None, min_length=1, max_length=80)
    year: int | None = Field(default=None, ge=1900, le=2100)
    maturity: Maturity | None = None
    runtime_min: int | None = Field(default=None, ge=1, le=600)
    genres: list[Genre] | None = Field(default=None, min_length=1, max_length=5)
    description: str | None = Field(default=None, min_length=10, max_length=400)
    featured: bool | None = None
    top10_rank: int | None = Field(default=None, ge=1, le=10)
    popularity: int | None = Field(default=None, ge=0, le=100)


class TitleIn(TitlePatch):
    slug: str = Field(pattern=r"^[a-z0-9-]{2,80}$")
    title: str = Field(min_length=1, max_length=80)
    year: int = Field(ge=1900, le=2100)
    maturity: Maturity
    runtime_min: int = Field(ge=1, le=600)
    genres: list[Genre] = Field(min_length=1, max_length=5)
    description: str = Field(min_length=10, max_length=400)
    license: str = Field(default="CC BY 4.0", max_length=40)
    credit: str = Field(default="Blender Foundation / Blender Studio", max_length=80)
    source_url: HttpUrl | None = None


class UserPatch(_Strict):
    role: Literal["user", "admin"] | None = None
    disabled: bool | None = None


class PageQuery(BaseModel):
    model_config = ConfigDict(extra="ignore")
    page: int = Field(default=1, ge=1, le=1000)
    limit: int = Field(default=20, ge=1, le=100)
