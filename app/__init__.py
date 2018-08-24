import os
import pickle
# third-party imports
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_caching import Cache
# local imports
from config import app_config

# db variable initialization
db = SQLAlchemy()
login_manager = LoginManager()
cache = Cache()


def create_app():
    config_name = os.getenv('FLASK_CONFIG')
    # app = Flask(__name__, 
    #     instance_relative_config=True, template_folder="client/build", static_folder="client/build/static")
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, supports_credentials=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['SECRET_KEY'] = 'super secret'
    db.init_app(app)

    login_manager.init_app(app)
    login_manager.login_message = "You must be logged in to access this page."
    login_manager.login_view = "auth.login"
    login_manager.session_protection = "strong"
    
    cache.init_app(app, config={
        'CACHE_TYPE': 'redis',
        'CACHE_REDIS_HOST': app.config['REDIS_HOST'],
        'CACHE_REDIS_PORT': app.config['REDIS_PORT'],
        'CACHE_REDIS_URL': app.config['REDIS_URL']
    })
    migrate = Migrate(app, db)

    from app import models

    # @app.route('/', defaults={'path': ''})
    # @app.route('/<path:path>')
    # def catch_all(path):
    #     """ This is a catch all that is required for react-router """
    #     return render_template('index.html')

    from .auth import auth as auth_blueprint
    from .customer import customer as customer_blueprint

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(customer_blueprint)

    return app