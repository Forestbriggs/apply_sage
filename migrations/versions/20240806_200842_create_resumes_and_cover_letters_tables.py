"""create resumes and cover_letters tables

Revision ID: 61cb63385375
Revises: fabeb6a98998
Create Date: 2024-08-06 20:08:42.789230

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '61cb63385375'
down_revision = 'fabeb6a98998'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cover_letters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=2048), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE cover_letters SET SCHEMA {SCHEMA};")
        
    op.create_table('resumes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=2048), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE resumes SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('resumes')
    op.drop_table('cover_letters')
    # ### end Alembic commands ###
