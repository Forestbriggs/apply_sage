from flask import Blueprint, request
from app.models import Application, db
from app.forms import ApplicationForm
from flask_login import current_user, login_required
from app.models.application_status import ApplicationStatus
from datetime import datetime

application_routes = Blueprint('application', __name__)


@application_routes.route('')
@login_required
def applications():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    applications = Application.query.filter(Application.user_id==current_user.id) \
        .paginate(page=page, per_page=per_page, error_out=False)
    return {
        'Applications': [app.to_dict() for app in applications],
        'total': applications.total,
        'pages': applications.pages,
        'current_page': applications.page
        }

    
@application_routes.route('/dashboard')
@login_required
def dashboard():
    recent_applications = Application.query.filter(Application.user_id==current_user.id) \
        .order_by(Application.applied_date.desc()).limit(2).all()
    return {'Applications': [app.to_dict() for app in recent_applications]}


@application_routes.route('/<int:application_id>')
@login_required
def application_details(application_id):
    application = Application.query.get(application_id)
    
    if not application:
        return {'errors': {'message': "Job Application couldn't be found"}}, 404
    
    if application.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    return application.to_dict_details()


@application_routes.post('')
@login_required
def create_application():
    form = ApplicationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        applied = ApplicationStatus.query.filter(ApplicationStatus.name=='Applied').first()
        
        new_application = Application(
            user_id = current_user.id,
            category_id = form.job_category.data,
            company_id = form.company.data,
            status_id = applied.id,
            title = form.title.data,
            salary_min = form.salary_min.data,
            salary_max = form.salary_max.data,
            applied_date = form.applied_date.data
        )

        db.session.add(new_application)
        db.session.commit()
        return new_application.to_dict(), 201
    return form.errors, 400


@application_routes.put('/<int:application_id>')
@login_required
def edit_application(application_id):
    application = Application.query.get(application_id)
    
    if not application:
        return {'errors': {'message': 'Job Application could not be found'}}, 404
    
    if application.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    form = ApplicationForm();
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        application.title = form.title.data
        application.category_id = form.job_category.data
        application.salary_min = form.salary_min.data
        application.salary_max = form.salary_max.data
        application.applied_date = form.applied_date.data
        application.updated_at = datetime.now()
        
        db.session.commit()
        return application.to_dict_details()
    return form.errors, 400

    
@application_routes.delete('/<int:application_id>')
@login_required
def delete_application(application_id):
    application = Application.query.get(application_id)
    
    if not application:
        return {'errors': {'message': 'Job Application could not be found'}}, 404
    
    if application.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    db.session.delete(application)
    db.session.commit()
    return {'message': 'Successfully deleted'}