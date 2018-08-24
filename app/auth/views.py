import urllib2
import pickle
import json
import datetime
from flask import current_app as app
from flask import url_for, redirect, session, request, jsonify
from flask_login import login_required, login_user, \
    logout_user, current_user
from werkzeug.exceptions import BadRequest, SecurityError, Forbidden
from app.models import User
from app import db, login_manager, cache
from . import auth


@login_manager.user_loader
def load_user(user_id):
    """Load user by ID from cache, if not in cache, then cache it."""
    # make a unique cache key for each user
    user = 'user_{}'.format(user_id)
    # check if the user_object is cached
    user_obj = pickle.loads(cache.get(user)) if cache.get(user) else None
    if user_obj is None:
        query = User.query.get(int(user_id))
        user_obj = pickle.dumps(query)
        cache.set(user, user_obj, timeout=3600)
        return query
    return user_obj


@auth.route('/login', methods=['POST'])
def login():
    """ Handle requests to the /login route """
    if current_user.is_authenticated:
        user_access_token_key = 'user_{}_access_token'.format(current_user.id)
        access_token = cache.get(user_access_token_key)
        return jsonify({
            'user_id': current_user.id, 
            'access_token': access_token, 
            'avatar': current_user.avatar,
            'display_name': current_user.display_name,
            'first_name': current_user.first_name,
            'last_name': current_user.last_name
        })
    params = request.json
    access_token = params['access_token']
    grant_type = params['grant_type']

    if grant_type != 'google':
        raise BadRequest("`grant_type` must be google")
    verify_url = 'https://www.googleapis.com/oauth2/v3/userinfo?access_token=%s' % access_token
    try:
        s = urllib2.urlopen(verify_url)
        response = json.loads(s.read())
        s.close()
    except urllib2.URLError as e:
        raise SecurityError('Access token verify failed!')

    google_id = str(response['sub'])
    gender = response['gender'] if response.has_key('gender') else None
    location = None
    avatar = None
    if response.has_key('picture'):
        avatar = response['picture']
    timezone = None
    if response.has_key('timezone'):
        timezone = int(response['timezone'])
    email = response['email']
    first_name = response.get('given_name', '')
    last_name = response.get('family_name', '')
    display_name = response.get('name', '')
    verified = response['email_verified'] \
        if response.has_key('email_verified') and response.has_key('email') else 0
    
    if email in app.config['SUPERVISOR_EMAIL']:
        user = User.query.filter_by(google_id=google_id).first()
        if not user:
            # create new user if not exist
            user = User()
            user.google_id = google_id
            user.email = email
            user.verified = verified
            user.email_verified = verified
            user.first_name = first_name
            user.last_name = last_name
            user.display_name = display_name
            if gender: user.gender = gender
            if avatar: user.avatar = avatar
            if timezone: user.timezone = timezone
            if location: user.location = location
            user.last_login_date = datetime.datetime.now()
            user.updated_at = user.last_login_date

            db.session.add(user)
            db.session.commit()

        # save access_token to redis cache
        user_access_token_key = 'user_{}_access_token'.format(user.id)
        cache.set(user_access_token_key, access_token, timeout=3600)

        login_user(user, remember=True)

        return jsonify({
            'user_id': user.id, 
            'access_token': access_token, 
            'avatar': user.avatar,
            'display_name': display_name,
            'first_name': first_name,
            'last_name': last_name
        })

    raise Forbidden("You need to contact with admin to create a account")


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({})


@auth.route('/me', methods=['POST'])
@login_required
def get_me():
    user_access_token_key = 'user_{}_access_token'.format(current_user.id)
    access_token = cache.get(user_access_token_key)
    return jsonify({
        'user_id': current_user.id, 
        'access_token': access_token, 
        'avatar': current_user.avatar,
        'display_name': current_user.display_name,
        'first_name': current_user.first_name,
        'last_name': current_user.last_name
    })