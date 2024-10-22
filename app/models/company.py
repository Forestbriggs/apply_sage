from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Company(db.Model):
    __tablename__ = 'companies'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(2048))
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())
    
    user = db.relationship('User', back_populates='companies')

    applications = db.relationship('Application', back_populates='company', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user': self.user.to_dict(),
            'applications': [app.to_dict() for app in self.applications],
            'website': self.website,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def to_dict_list_page(self):
        return {
            'id': self.id,
            'name': self.name,
            'user': self.user.to_dict(),
            'website': self.website,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def to_dict_app_details(self):
        return {
            'id': self.id,
            'name': self.name,
            'website': self.website,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }