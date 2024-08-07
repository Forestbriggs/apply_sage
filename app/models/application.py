from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Application(db.Model):
    __tablename__ = 'job_applications'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')))
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('job_categories.id')))
    status_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('application_statuses.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    salary_min = db.Column(db.Numeric(precision=10, scale=2))
    salary_max = db.Column(db.Numeric(precision=10, scale=2))
    resume_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('resumes.id')))
    cover_letter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cover_letters.id')))
    applied_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    company = db.relationship('Company', back_populates='applications')
    
    user = db.relationship('User', back_populates='applications')
    
    category = db.relationship('JobCategory', back_populates='applications')

    status = db.relationship('ApplicationStatus', back_populates='applications')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'status': self.status.to_dict(),
            'category': self.category.to_dict(),
            'salary_min': self.salary_min,
            'salary_max': self.salary_max,
            'resume_id': self.resume_id,
            'cover_letter_id': self.cover_letter_id,
            'applied_date': self.applied_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def to_dict_details(self):
        return {
            'id': self.id,
            'title': self.title,
            'status': self.status.to_dict(),
            'category': self.category.to_dict(),
            'company': self.company.to_dict_app_details(),
            'salary_min': self.salary_min,
            'salary_max': self.salary_max,
            'resume_id': self.resume_id,
            'cover_letter_id': self.cover_letter_id,
            'applied_date': self.applied_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }