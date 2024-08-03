from flask import Blueprint, request
from app.models import Company, db
from flask_login import current_user, login_required

company_routes = Blueprint('company', __name__)