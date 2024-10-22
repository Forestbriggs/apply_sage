from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class JobCategory(db.Model):
    __tablename__ = 'job_categories'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    applications = db.relationship('Application', back_populates='category')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }