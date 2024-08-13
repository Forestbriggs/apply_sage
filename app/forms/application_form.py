from click import Option
from flask_wtf import FlaskForm
from wtforms import DateField, SelectField, StringField, FloatField, ValidationError
from wtforms.validators import DataRequired, Length, Optional, NumberRange
from datetime import datetime
from flask_login import current_user

from app.models.company import Company
from app.models.job_category import JobCategory

def validate_salary_range(form, field):
    if form.salary_min.data is not None and form.salary.max_data is not None:
        if form.salary_min.data >= form.salary_max.data:
            raise ValidationError('Maximum salary must be greater than minimum salary.')
        
def validate_salary_presence(form, field):
    if (form.salary_min.data is None) != (form.salary_max.data is None):
        raise ValidationError('Both minimum salary and maximum salary must be provided or left empty.')
    
def validate_applied_date(form, field):
    if field.data > datetime.today().date():
        raise ValidationError('The applied date cannot be in the future.')

class ApplicationForm(FlaskForm):
    def __init__(self, *args, **kwargs):
        super(ApplicationForm, self).__init__(*args, **kwargs)
        self.job_category.choices = \
            [(c.id, c.name) for c in JobCategory.query.all()]
        self.company.choices = \
            [(c.id, c.name) for c in Company.query.filter(Company.user_id==current_user.id)]
    
    title = StringField('title', validators=[
        DataRequired(message='Title is required.'),
        Length(max=100, message='Title must be 100 characters or less.')
    ])
    company = SelectField('company', choices=[], validators=[Optional()])
    job_category = SelectField('job_category', choices=[], validators=[Optional()])
    salary_min = FloatField('salary_min', validators=[
        Optional(),
        NumberRange(min=0, message='Minimum salary must be at least 0.'),
        validate_salary_presence,
        validate_salary_range
    ])
    salary_max = FloatField('salary_max', validators=[
        Optional(),
        NumberRange(min=0, message='Maximum salary must be at least 0'),
        validate_salary_presence,
        validate_salary_range
    ])
    applied_date = DateField('applied_date', format='%m/%d/%Y', validators=[
        Optional(),
        validate_applied_date
    ])