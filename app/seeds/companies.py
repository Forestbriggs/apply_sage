from app.models import db, Company, User, environment, SCHEMA
from sqlalchemy.sql import text

user_companies = [
    {
        'username': 'Demo',
        'companies': [
            {
                'name': 'Apple',
                'website': 'https://www.apple.com/careers/us/'
            },
            {
                'name': 'Google',
                'website': 'https://www.google.com/about/careers/applications/'
            },
            {
                'name': 'Amazon',
                'website': 'https://www.amazon.jobs/en/landing_pages/tech-roles'
            },
            {
                'name': 'Netflix',
                'website': 'https://netflix.eightfold.ai/careers'
            }
        ]
    }
]

def seed_companies():
    for info in user_companies:
        username, companies = info.values()
        user = User.query.filter(User.username == username).first()
        
        for company_info in companies:
            name, website = company_info.values()
            
            new_company = Company(
                name=name,
                website=website,
                user_id=user.id
            )
            user.companies.append(new_company)
    db.session.commit()
    
def undo_companies():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM companies"))
    
    db.session.commit()