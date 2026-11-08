"""Validated request bodies for sign-up and sign-in (unknown fields are rejected)."""
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class _Strict(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class LoginIn(_Strict):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

    @field_validator("email")
    @classmethod
    def _lower(cls, value: str) -> str:
        return value.lower()


class SignupIn(LoginIn):
    name: str = Field(min_length=2, max_length=40, pattern=r"^[\w\s.'-]+$")
