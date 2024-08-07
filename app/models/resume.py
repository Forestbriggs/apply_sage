from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Resume(db.Model):
    __tablename__ = 'resumes'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2048), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())