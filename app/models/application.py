from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Application(db.Model):
    __tablename__ = 'job_applications'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    company_id = db.Column(db.Integer)
    category_id = db.Column(db.Integer)
    status_id = db.Column(db.Integer)
    location = db.Column(db.String(100))
    title = db.Column(db.String(100), nullable=False)
    salary_min = db.Column(db.Float)
    salary_max = db.Column(db.Float)
    resume = db.Column(db.String(2048))
    cover_letter = db.Column(db.String(2048))
    applied_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())