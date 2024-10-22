"""create job_applications table

Revision ID: eb63abfb5d90
Revises: 61cb63385375
Create Date: 2024-08-06 20:10:36.167666

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'eb63abfb5d90'
down_revision = '61cb63385375'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('job_applications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.Column('status_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('salary_min', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('salary_max', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('resume_id', sa.Integer(), nullable=True),
    sa.Column('cover_letter_id', sa.Integer(), nullable=True),
    sa.Column('applied_date', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['job_categories.id'], ),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.ForeignKeyConstraint(['cover_letter_id'], ['cover_letters.id'], ),
    sa.ForeignKeyConstraint(['resume_id'], ['resumes.id'], ),
    sa.ForeignKeyConstraint(['status_id'], ['application_statuses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    
    if environment == 'production':
        op.execute(f"ALTER TABLE job_applications SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('job_applications')
    # ### end Alembic commands ###
