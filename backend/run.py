"""Development entry point: python run.py (use a WSGI server such as gunicorn in production)."""
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=app.config["PORT"], debug=False)
