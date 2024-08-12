from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import JobCategory, db

category_routes = Blueprint('category', __name__)


@category_routes.route('')
@login_required
def categories():
    categories = JobCategory.query.all()
    return [category.to_dict() for category in categories]