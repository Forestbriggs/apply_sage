from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Length


class CompanyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    website = URLField('website')