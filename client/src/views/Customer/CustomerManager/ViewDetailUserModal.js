import React, { Component } from 'react';
import moment from 'moment';
import { Button, Card, CardBody, Col, Row,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Form, FormGroup, Label } from 'reactstrap';


class ViewDetailUserModal extends Component {
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
      }    
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isOpen !== this.state.isOpen) {
      var customer = nextProps.customer
      customer.birthday = moment(customer.birthday).format("YYYY-MM-DD")
      this.setState({
        isOpen: nextProps.isOpen,
        customer: customer,
      })
    }
  }

  render(){
    return(
      <Modal isOpen={this.state.isOpen} className={'modal-success'}>
        <ModalHeader><i className="fa fa-user"></i> Thông tin khách hàng</ModalHeader>
        <ModalBody>
          <div className="animated fadeIn">
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <Form>
                      <FormGroup row>
                        <Col md="4">
                          <Label><b>Họ và tên:</b></Label>
                        </Col>
                        <Col xs="12" md="8">
                          {this.state.customer.fullname}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label><b>Email:</b></Label>
                        </Col>
                        <Col xs="12" md="8">
                          {this.state.customer.email}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label><b>Số điện thoại:</b></Label>
                        </Col>
                        <Col xs="12" md="8">
                          {this.state.customer.phone}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label><b>Ngày sinh:</b></Label>
                        </Col>
                        <Col xs="12" md="8">
                          {this.state.customer.birthday}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="4">
                          <Label><b>Ghi chú:</b></Label>
                        </Col>
                        <Col xs="12" md="8">
                          {this.state.customer.note}
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
          <Button color="secondary" onClick={this.props.toggleViewDetailUserModal}>Huỷ</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ViewDetailUserModal;