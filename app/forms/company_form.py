from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Length, Optional, URL
class CompanyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    website = StringField('website', 
        validators=[Optional(), URL()])