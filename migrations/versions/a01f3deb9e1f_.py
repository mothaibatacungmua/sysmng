"""empty message

Revision ID: a01f3deb9e1f
Revises: b7f08621c21d
Create Date: 2018-08-14 17:17:34.913468

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a01f3deb9e1f'
down_revision = 'b7f08621c21d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('customer', sa.Column('fullname', sa.String(length=100), nullable=False))
    op.alter_column('customer', 'phone',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.drop_column('customer', 'full_name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('customer', sa.Column('full_name', mysql.VARCHAR(length=100), nullable=False))
    op.alter_column('customer', 'phone',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.drop_column('customer', 'fullname')
    # ### end Alembic commands ###
