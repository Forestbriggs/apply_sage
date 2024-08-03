from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class ApplicationStatus(db.Model):
    __tablename__ = 'application_statuses'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.Integer, nullable=False)
    status_id = db.Column(db.Integer, nullable=False)
    status_change_date = db.Column(db.DateTime, nullable=False)
    notes = db.Column(db.String(1500))
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())