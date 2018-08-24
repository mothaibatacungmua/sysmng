import urllib2
import pickle
import json
import datetime
import re
from flask import current_app as app
from flask import url_for, redirect, session, request, jsonify
from flask_login import login_required, login_user, \
    logout_user, current_user
from werkzeug.exceptions import BadRequest, SecurityError, Forbidden, InternalServerError
from app.models import Customer
from app import db, login_manager, cache
from . import customer
import logging

EMAIL_PATTERN = r'^\S+@\S+\.\S+$'
PHONE_PATTERN = r'^\d{10,11}$'


@customer.route('/create', methods=['POST'])
@login_required
def customer_create():
    params = request.json
    required_fields = ['fullname', 'phone']
    for rf in required_fields:
        if not params.has_key(rf):
            raise BadRequest("Need `%s` field" % rf, 
                jsonify({'errCode': 'ERROR_FIELD_REQUIRED'}))
    
    if not len(params['fullname']):
        raise BadRequest("Fullname not null", 
            jsonify({'errCode': 'ERROR_FULLNAME_IS_NULL'}))

    phone = params['phone']
    email = params['email']
    note = params.get('note', "")
    if not re.match(PHONE_PATTERN, phone):
        raise BadRequest("Phone is not true format",
            response=jsonify({'errCode': 'ERROR_PHONE_FORMAT'}))
    if not re.match(EMAIL_PATTERN, email):
        raise BadRequest("Email is not true format",
            jsonify({'errCode': 'ERROR_EMAIL_FORMAT'}))
    if len(note) > 1000:
        raise BadRequest("Note is too long",
            jsonify({'errCode': 'ERROR_NOTE_TOO_LONG'}))

    conds = (Customer.phone == params['phone'])
    if params.get('email'):
        conds |= (Customer.email == params['email'])
    customer_obj = Customer.query.filter(conds).first()

    if customer_obj:
        raise SecurityError("Customer %s is existed!" % params['fullname'],
            jsonify({'errCode': 'ERROR_CUSTOMER_IS_EXISTED'}))

    #TODO verify email and phone
    customer_obj = Customer()
    customer_obj.fullname = params['fullname']
    customer_obj.email = email
    customer_obj.phone = phone
    customer_obj.note = note
    customer_obj.birthday = params.get('birthday')
    customer_obj.created_at = datetime.datetime.utcnow()
    customer_obj.updated_at = datetime.datetime.utcnow()

    db.session.add(customer_obj)
    db.session.commit()

    customer_obj = Customer.query.filter(Customer.phone == phone).first()

    return jsonify(customer_obj.to_dict())


@customer.route('/update', methods=['POST'])
@login_required
def customer_update():
    params = request.json
    required_fields = ['id']
    for rf in required_fields:
        if not params.has_key(rf):
            raise BadRequest("Need `%s` field" % rf, 
                jsonify({'errCode': 'ERROR_FIELD_REQUIRED'}))
    customer_obj = Customer.query.filter_by(id=params['id']).first()

    if not customer_obj:
        raise SecurityError("Customer %s is existed!" % params['fullname'],
            jsonify({'errCode': 'ERROR_CUSTOMER_NOT_EXISTED'}))

    customer_obj.fullname = params.get('fullname', customer_obj.fullname)
    customer_obj.email = params.get('email', customer_obj.email)
    customer_obj.phone = params.get('phone', customer_obj.phone)
    customer_obj.note = params.get('note', customer_obj.note)
    customer_obj.birthday = params.get('birthday', customer_obj.birthday)
    customer_obj.updated_at = datetime.datetime.utcnow()

    db.session.merge(customer_obj)
    db.session.commit()

    return jsonify({
        customer_obj.to_dict()
    })


@customer.route('/delete', methods=['POST'])
@login_required
def customer_delete():
    params = request.json

    db.session.query(Customer).filter_by(id=int(params['customer_id'])).delete()
    db.session.commit()
    return jsonify({})


@customer.route('/list', methods=['POST'])
@login_required
def customer_list():
    try:
        params = request.json
    except:
        params = {}
    offset = params.get('offset', 0)
    limit = params.get('limit', 30)
    customers = Customer.query\
                    .filter()\
                    .order_by(Customer.created_at.desc()) \
                    .limit(limit)\
                    .offset(offset)\
                    .all()
    print(customers)
    results = []
    for c in customers:
        results.append(c.to_dict())

    return jsonify(results)


@customer.route('/count', methods=['GET', 'POST'])
@login_required
def customer_count():
    try:
        number_of_customers = db.session.query(Customer).count()
        return jsonify({
            'number': db.session.query(Customer).count()
        })
    except:
        raise InternalServerError("Internal Server Error", 
            jsonify({'errCode': 'ERROR_INTERNAL_SERVER_ERROR'}))
    