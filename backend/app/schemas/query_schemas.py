"""Validated query strings for list endpoints."""
from pydantic import BaseModel, ConfigDict, Field


class TitlesQuery(BaseModel):
    model_config = ConfigDict(extra="ignore")
    genre: str | None = Field(default=None, pattern=r"^[a-z0-9-]{1,40}$")
    limit: int = Field(default=20, ge=1, le=50)
    after: int | None = Field(default=None, ge=0, description="popularity cursor from the last page")
