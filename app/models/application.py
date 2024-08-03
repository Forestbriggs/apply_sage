from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

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
    resume = db.Column(db.String(2048))
    cover_letter = db.Column(db.String(2048))
    applied_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())

    company = db.relationship('Company', back_populates='applications')
    
    user = db.relationship('User')
    
    category = db.relationship('JobCategory', back_populates='applications')

    status = db.relationship('ApplicationStatus', back_populates='applications')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'salary_min': self.salary_min,
            'salary_max': self.salary_max,
            'resume': self.resume,
            'cover_letter': self.cover_letter,
            'applied_date': self.applied_date
        }