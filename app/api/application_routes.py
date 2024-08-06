from flask import Blueprint, request
from app.models import Application, db
from flask_login import current_user, login_required
from datetime import datetime

application_routes = Blueprint('application', __name__)


@application_routes.route('')
@login_required
def applications():
    applications = Application.query.filter(Application.user_id==current_user.id)
    return {'Applications': [app.to_dict() for app in applications]}

@application_routes.route('/<int:application_id>')
@login_required
def application_details(application_id):
    application = Application.query.get(application_id)
    
    if not application:
        return {'errors': {'message': "Job Application couldn't be found"}}, 404
    
    if application.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    return application.to_dict_details()