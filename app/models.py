from flask_login import UserMixin
from app import db, login_manager
import datetime


class User(UserMixin, db.Model):
    """
    Create an User table
    """

    # Ensures table will be named in plural and not in singular
    # as is the name of the model
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    google_id = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    first_name = db.Column(db.String(100), nullable=True)
    last_name = db.Column(db.String(100), nullable=True)
    display_name = db.Column(db.String(100), nullable=True)
    avatar = db.Column(db.String(200))
    tokens = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    user_type = db.Column(db.Enum('guess', 'supervisor', 'admin'), default='guess')
    last_login_date = db.Column(db.DateTime)


class Customer(db.Model):
    """
    Create an Customer table
    """
    __tablename__ = 'customer'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100), unique=True)
    fullname = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    note = db.Column(db.Text, default="")
    birthday = db.Column(db.DateTime)

    def to_dict(self):
        d = {}
        for column in self.__table__.columns:
            d[column.name] = unicode(getattr(self, column.name))
        return d


class ReceivedCars(db.Model):
    """
    Received Car model
    """
    __tablename__ = 'received_car'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id =  db.Column(db.Integer, unique=True, nullable=False)
    license_plate = db.Column(db.String(20), nullable=False)
    car_model = db.Column(db.String(30), nullable=False)
    car_color = db.Column(db.String(20), nullable=False)
    car_released_date = db.Column(db.Integer)
    insurance_time = db.Column(db.DateTime)
    runned_km = db.Column(db.Integer, default=0)
    note = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())


# class FixingHistory(db.Model):
#     """
#     Fixing history table
#     """
#     __tablename__ = 'fixing_history'
#     license_plate =  db.Column(db.String(20), nullable=False)
#     state = db.Column(db.Enum('checking', 'wait_verify', 'fixing', 'fixed', 'paid'))
