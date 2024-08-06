from app.models import db, ApplicationStatus, environment, SCHEMA
from sqlalchemy.sql import text

def seed_application_statuses():
    applied = ApplicationStatus(
        name='Applied'
    )
    
    interviewed = ApplicationStatus(
        name='Interviewed'
    )
    
    offer_received = ApplicationStatus(
        name='Offer Received'
    )
    
    accepted = ApplicationStatus(
        name='Accepted'
    )
    
    rejected = ApplicationStatus(
        name='Rejected'
    )
    
    withdrawn = ApplicationStatus(
        name='Withdrawn'
    )
    
    db.session.add(applied)
    db.session.add(interviewed)
    db.session.add(offer_received)
    db.session.add(accepted)
    db.session.add(rejected)
    db.session.add(withdrawn)
    db.session.commit()
    
def undo_application_statuses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.application_statuses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM application_statuses"))
        
    db.session.commit()