from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Company(db.Model):
    __tablename__ = 'companies'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(2048))
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    user = db.relationship('User', back_populates='companies')

    applications = db.relationship('Application', back_populates='company')