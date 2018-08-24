import React, { Component } from 'react';
import moment from 'moment';
import { Button, Card, CardBody, Col, Row,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Form, FormGroup, Label, FormText, Input, Alert } from 'reactstrap';
import { CustomerAPI } from '../../../apis/customer';

const TEXT_ERROR = {
  'ERROR_FIELD_REQUIRED': 'Thông tin người bị thiếu',
  'ERROR_FULLNAME_IS_NULL': 'Họ tên người dùng rỗng',
  'ERROR_PHONE_FORMAT': 'Định dạng số điện thoại không đúng (10-11 chữ số) ',
  'ERROR_EMAIL_FORMAT': 'Định dạng email không đúng',
  'ERROR_NOTE_TOO_LONG': 'Ghi chú người dùng quá dài (ít hơn 1000 ký tự)',
  'ERROR_CUSTOMER_IS_EXISTED': 'Người dùng đã tồn tại',
  'ERROR_CUSTOMER_NOT_EXISTED': 'Người dùng chưa tồn tại'
};

class EditUserModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      customer: { 
        id: props.customer.id, 
        fullname: props.customer.fullname, 
        email: props.customer.email, 
        phone: props.customer.phone, 
        birthday: moment(props.customer.birthday).format("YYYY-MM-DD"), 
        note: props.customer.note 
      },
      displayError:null,
    };

    this.customerAPI = new CustomerAPI();
    this._parent = this.props.parent;
    this.handleChangeNameCustomer = this.handleChangeNameCustomer.bind(this);
    this.handleChangeEmailCustomer = this.handleChangeEmailCustomer.bind(this);
    this.handleChangePhoneCustomer = this.handleChangePhoneCustomer.bind(this);
    this.handleChangeBirthdayCustomer = this.handleChangeBirthdayCustomer.bind(this);
    this.handleChangeNoteCustomer = this.handleChangeNoteCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
  }

  handleChangeNameCustomer(event) {
    var customer = this.state.customer;
    customer.fullname = event.target.value;

    this.setState({
      customer: customer
    })
  }

  handleChangeEmailCustomer(event) {
    var customer = this.state.customer;
    customer.email = event.target.value;

    this.setState({
      customer: customer
    })
  }

  handleChangePhoneCustomer(event) {
    var customer = this.state.customer;
    customer.phone = event.target.value;

    this.setState({
      customer: customer
    })
  }

  handleChangeBirthdayCustomer(event) {
    var customer = this.state.customer;
    customer.birthday = event.target.value;

    this.setState({
      customer: customer
    })
  }

  handleChangeNoteCustomer(event) {
    var customer = this.state.customer;
    customer.note = event.target.value;

    this.setState({
      customer: customer
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isOpen !== this.state.isOpen) {
      var customer = nextProps.customer
      customer.birthday = moment(customer.birthday).format("YYYY-MM-DD")
      this.setState({
        isOpen: nextProps.isOpen,
        customer: customer,
        customerIndex: nextProps.customerIndex
      })
    }
  }

  updateCustomer() {
    this.customerAPI
      .create(this.state.customer)
      .done(result => {
        if (result.errCode){
          this.setState({
            displayError:{
              errCode: result.errCode,
              message: TEXT_ERROR[result.errCode]
            }
          })
        }else{
          this.props.updateCallback(this.state.customerIndex, result);
          this.setState({
            customer:{ fullname: '', email: '', phone: '', birthday: '', note: '' },
            displayError:null,
          })
        }
      })
  }

  render(){
    return(
      <Modal isOpen={this.state.isOpen} className={'modal-success'}>
        <ModalHeader><i className="fa fa-user"></i> Chỉnh sửa thông tin khách hàng</ModalHeader>
        <ModalBody>
          <div className="animated fadeIn">
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    {!this.state.displayError ? null: (
                      <Alert color="danger">
                        {this.state.displayError.message}
                      </Alert>
                    )}
                    <Form>
                      <FormGroup row>
                        <Col md="4">
                          <Label>Họ và tên:</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="text" name="text-input" placeholder="Nguyễn Văn A..." 
                            value={this.state.customer.fullname} onChange={this.handleChangeNameCustomer} />
                          <FormText color="muted">Họ tên đầy đủ của khách hàng</FormText>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label>Email:</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="text" name="text-input" placeholder="admin@gmail.com..." 
                            value={this.state.customer.email} onChange={this.handleChangeEmailCustomer} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label>Số điện thoại:</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="text" name="text-input" placeholder="0982112345..." 
                            value={this.state.customer.phone} onChange={this.handleChangePhoneCustomer} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label>Ngày sinh:</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="date" name="date-input" 
                            value={this.state.customer.birthday} onChange={this.handleChangeBirthdayCustomer} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label>Ghi chú:</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="textarea" name="text-note" 
                            value={this.state.customer.note} onChange={this.handleChangeNoteCustomer} />
                        </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateCustomer}>Cập nhật</Button>{' '}
          <Button color="secondary" onClick={this.props.toggleEditUserModal}>Huỷ</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default EditUserModal;