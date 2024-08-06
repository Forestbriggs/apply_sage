from app.models import db, JobCategory, environment, SCHEMA
from sqlalchemy.sql import text

def seed_job_categories():
    frontend = JobCategory(
        name='Frontend Engineer',
    )
    backend = JobCategory(
        name='Backend Engineer'
    )
    fullstack = JobCategory(
        name='Full Stack Engineer',
    )
    mobile = JobCategory(
        name='Mobile Engineer'
    )
    devops = JobCategory(
        name='DevOps Engineer',
    )
    cloud = JobCategory(
        name='Cloud Engineer'
    )
    
    db.session.add(frontend)
    db.session.add(backend)
    db.session.add(fullstack)
    db.session.add(mobile)
    db.session.add(devops)
    db.session.add(cloud)
    db.session.commit()
    
def undo_job_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.job_categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM job_categories"))
        
    db.session.commit()