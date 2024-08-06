from app.models import db, Application, JobCategory, ApplicationStatus, \
    Company, User, environment, SCHEMA
    
from sqlalchemy.sql import text
from datetime import datetime

user_applications = [
    {   
        'username': 'Demo',
        'applications': [
            {
                'company_name': 'Apple',
                'category_name': 'Frontend Engineer',
                'status_name': 'Applied',
                'application_info': {
                    'title': 'Senior Software Engineer',
                    'salary_min': 135000,
                    'salary_max': 250000,
                    'applied_date': datetime.now()
                }
            },
            {
                'company_name': 'Google',
                'category_name': 'Backend Engineer',
                'status_name': 'Interviewed',
                'application_info': {
                    'title': 'Staff Software Engineer',
                    'salary_min': 150000,
                    'salary_max': 280000,
                    'applied_date': datetime.now()
                }
            },
            {
                'company_name': 'Netflix',
                'category_name': 'Full Stack Engineer',
                'status_name': 'Offer Received',
                'application_info': {
                    'title': 'Senior Full Stack Engineer',
                    'salary_min': 140000,
                    'salary_max': 260000,
                    'applied_date': datetime.now()
                }
            },
            {
                'company_name': 'Amazon',
                'category_name': 'DevOps Engineer',
                'status_name': 'Accepted',
                'application_info': {
                    'title': 'Senior DevOps Engineer',
                    'salary_min': 130000,
                    'salary_max': 240000,
                    'applied_date': datetime.now()
                }
            },
            {
                'company_name': 'Google',
                'category_name': 'Cloud Engineer',
                'status_name': 'Rejected',
                'application_info': {
                    'title': 'Senior Cloud Engineer',
                    'salary_min': 160000,
                    'salary_max': 290000,
                    'applied_date': datetime.now()
                }
            },
            {
                'company_name': 'Netflix',
                'category_name': 'Mobile Engineer',
                'status_name': 'Withdrawn',
                'application_info': {
                    'title': 'Senior Mobile Engineer',
                    'salary_min': 150000,
                    'salary_max': 275000,
                    'applied_date': datetime.now()
                }
            }
        ]
    }
]

def seed_applications():
    for info in user_applications:
        username, applications = info.values()
        user = User.query.filter(User.username == username).first()
        
        for application in applications:
            company_name, category_name, status_name, \
            application_info = application.values()
            
            title, salary_min, salary_max, applied_date = application_info.values()
            
            company = Company.query.filter(Company.name == company_name).first()
            category = JobCategory.query.filter(JobCategory.name == category_name).first()
            status = ApplicationStatus.query.filter(ApplicationStatus.name == status_name).first()
            
            new_application = Application(
                user_id=user.id,
                company_id=company.id,
                category_id=category.id,
                status_id=status.id,
                title=title,
                salary_min=salary_min,
                salary_max=salary_max,
                applied_date=applied_date
            )
            user.applications.append(new_application)
    db.session.commit()
    
    
def undo_applications():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.job_applications RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM job_applications"))
        
    db.session.commit()