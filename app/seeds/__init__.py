from flask.cli import AppGroup
from .users import seed_users, undo_users
from .companies import seed_companies, undo_companies
from .application_statuses import seed_application_statuses, undo_application_statuses
from .job_categories import seed_job_categories, undo_job_categories

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_job_categories()
        undo_application_statuses()
        undo_companies()
        undo_users()
    seed_users()
    seed_companies()
    seed_application_statuses()
    seed_job_categories()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_job_categories()
    undo_application_statuses()
    undo_companies()
    undo_users()
    # Add other undo functions here
