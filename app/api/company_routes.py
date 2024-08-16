from flask import Blueprint, request
from app.models import Company, db
from app.forms import CompanyForm
from flask_login import current_user, login_required
from datetime import datetime

company_routes = Blueprint('company', __name__)


@company_routes.get('')
@login_required
def companies():
    companies = Company.query.filter(Company.user_id==current_user.id)
    return {'Companies': [company.to_dict_list_page() for company in companies]}


@company_routes.route('/<int:company_id>')
@login_required
def company_details(company_id):
    company = Company.query.get(company_id)
    
    if not company:
        return {'errors': {'message': "Company couldn't be found"}}, 404
    
    if company.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    return company.to_dict()


@company_routes.post('')
@login_required
def create_company():
    form = CompanyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_company = Company(
            user_id = current_user.id,
            name = form.name.data,
            website = form.website.data or None
        )
    
        db.session.add(new_company)
        db.session.commit()
        return new_company.to_dict(), 201
    return form.errors, 400


@company_routes.put('/<int:company_id>')
@login_required
def edit_company(company_id):
    company = Company.query.get(company_id)
    
    if not company:
        return {'errors': {'message': "Company couldn't be found"}}, 404
    
    if company.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    form = CompanyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        company.name = form.name.data
        company.website = form.website.data
        company.updated_at = datetime.now()
        
        db.session.commit()
        return company.to_dict()
    return form.errors, 400


@company_routes.delete('/<int:company_id>')
@login_required
def delete_company(company_id):
    company = Company.query.get(company_id)
    
    if not company:
        return {'errors': {'message': "Company couldn't be found"}}, 404
    
    if company.user_id != current_user.id:
        return {'error': {'message': 'Unauthorized'}}, 401
    
    db.session.delete(company)
    db.session.commit()
    return {'message': 'Successfully deleted'}