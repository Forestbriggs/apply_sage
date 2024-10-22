from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ApplicationStatus(db.Model):
    __tablename__ = 'application_statuses'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())
    
    applications = db.relationship('Application', back_populates='status')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }