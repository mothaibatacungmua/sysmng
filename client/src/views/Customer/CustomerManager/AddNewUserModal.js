import React, { Component } from 'react';
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
  'ERROR_CUSTOMER_IS_EXISTED': 'Người dùng đã tồn tại'
};

class AddNewUserModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      newCustomer:{ fullname: '', email: '', phone: '', birthday: '', note: '' },
      displayError:null,
    };

    this.customerAPI = new CustomerAPI();
    this._parent = this.props.parent;
    this.handleChangeNameNewCustomer = this.handleChangeNameNewCustomer.bind(this);
    this.handleChangeEmailNewCustomer = this.handleChangeEmailNewCustomer.bind(this);
    this.handleChangePhoneNewCustomer = this.handleChangePhoneNewCustomer.bind(this);
    this.handleChangeBirthdayNewCustomer = this.handleChangeBirthdayNewCustomer.bind(this);
    this.handleChangeNoteNewCustomer = this.handleChangeNoteNewCustomer.bind(this);
    this.submitNewCustomer = this.submitNewCustomer.bind(this);
  }

  handleChangeNameNewCustomer(event) {
    var newCustomer = this.state.newCustomer;
    newCustomer.fullname = event.target.value;

    this.setState({
      newCustomer: newCustomer
    })
  }

  handleChangeEmailNewCustomer(event) {
    var newCustomer = this.state.newCustomer;
    newCustomer.email = event.target.value;

    this.setState({
      newCustomer: newCustomer
    })
  }

  handleChangePhoneNewCustomer(event) {
    var newCustomer = this.state.newCustomer;
    newCustomer.phone = event.target.value;

    this.setState({
      newCustomer: newCustomer
    })
  }

  handleChangeBirthdayNewCustomer(event) {
    var newCustomer = this.state.newCustomer;
    newCustomer.birthday = event.target.value;

    this.setState({
      newCustomer: newCustomer
    })
  }

  handleChangeNoteNewCustomer(event) {
    var newCustomer = this.state.newCustomer;
    newCustomer.note = event.target.value;

    this.setState({
      newCustomer: newCustomer
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isOpen !== this.state.isOpen) {
      this.setState({isOpen: nextProps.isOpen})
    }
  }

  submitNewCustomer() {
    this.customerAPI
      .create(this.state.newCustomer)
      .done(result => {
        if (result.errCode){
          this.setState({
            displayError:{
              errCode: result.errCode,
              message: TEXT_ERROR[result.errCode]
            }
          })
        }else{
          this.props.submitCallback(result);
          this.setState({
            newCustomer:{ fullname: '', email: '', phone: '', birthday: '', note: '' },
            displayError:null,
          })
        }
      })
  }

  render(){
    return(
      <Modal isOpen={this.state.isOpen} className={'modal-success'}>
        <ModalHeader><i className="fa fa-user"></i> Thêm khách hàng mới</ModalHeader>
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
                            value={this.state.newCustomer.fullname} onChange={this.handleChangeNameNewCustomer} />
                          <FormText color="muted">Họ tên đầy đủ của khách hàng</FormText>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label>Email:</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="text" name="text-input" placeholder="admin@gmail.com..." 
                            value={this.state.newCustomer.email} onChange={this.handleChangeEmailNewCustomer} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label>Số điện thoại:</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="text" name="text-input" placeholder="0982112345..." 
                            value={this.state.newCustomer.phone} onChange={this.handleChangePhoneNewCustomer} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label>Ngày sinh:</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="date" name="date-input" 
                            value={this.state.newCustomer.birthday} onChange={this.handleChangeBirthdayNewCustomer} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label>Ghi chú:</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input type="textarea" name="text-note" 
                            value={this.state.newCustomer.note} onChange={this.handleChangeNoteNewCustomer} />
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
          <Button color="primary" onClick={this.submitNewCustomer}>Thêm</Button>{' '}
          <Button color="secondary" onClick={this.props.toggleNewUserModal}>Huỷ</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default AddNewUserModal;