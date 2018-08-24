import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, CardHeader, Col, 
        Pagination, PaginationItem, PaginationLink, Row, Table,
        Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
        Modal, ModalBody, ModalFooter, ModalHeader,
        Form, FormGroup, Label, FormText, Input } from 'reactstrap';

import receivedCarsData from './ReceivedCarsData';


class CarManager extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);

    this.state = {
      dropdownOpen: new Array(6).fill(false),
      receivedCars: [],
      success: false,
    };

    // Create a year range for selecting released date
    const yearBase = 1990;
    var range = 50;
    var yearRange = [];
    for (var i=0; i<range; i++){
      yearRange.push(yearBase+i)
    }
    this.yearRange = yearRange;
  }

  componentDidMount() {
    this.setState({receivedCars: receivedCarsData});
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  render() {
    

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> <b>Các xe đã tiếp nhận</b>
                <Button active onClick={this.toggleSuccess} color="success" aria-pressed="true" className="card-header-actions"><i className="fa fa-plus"> Thêm mới</i></Button>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}><i className="fa fa-car"></i> Tiếp nhận xe mới</ModalHeader>
                  <ModalBody>
                    <div className="animated fadeIn">
                      <Row>
                        <Col xs="12">
                          <Card>
                            <CardBody>
                              <Form>
                                <FormGroup row>
                                  <Col md="4">
                                    <Label>Khách hàng:</Label>
                                  </Col>
                                  <Col xs="12" md="8">
                                    <Input type="text" name="text-input" placeholder="admin@gmail.com..." />
                                    <FormText color="muted">Email hoặc số điện thoại của khách hàng</FormText>
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col md="4">
                                    <Label>Biển số xe:</Label>
                                  </Col>
                                  <Col xs="12" md="8">
                                    <Input type="text" name="text-input" placeholder="29F-123456..." />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col md="4">
                                    <Label>Loại xe:</Label>
                                  </Col>
                                  <Col xs="12" md="8">
                                    <Input type="text" name="text-input" placeholder="Mazda 3..." />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col md="4">
                                    <Label>Màu xe:</Label>
                                  </Col>
                                  <Col xs="12" md="8">
                                    <Input type="text" name="text-input" placeholder="Xanh, đỏ..." />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col md="4">
                                    <Label>Năm sản xuất:</Label>
                                  </Col>
                                  <Col xs="12" md="8">
                                  <Input type="select" name="select" id="select">
                                  <option value="0">Chọn năm</option>
                                  {
                                    this.yearRange.map( item => {
                                      return (<option key={""+ item +""} value={""+ item +""}>{item}</option>)
                                    })
                                  }
                                  </Input>
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col md="4">
                                    <Label>Bảo hiểm ngày mua:</Label>
                                  </Col>
                                  <Col xs="12" md="8">
                                    <Input type="date" id="date-input" name="date-input" />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Col md="4">
                                    <Label>Số KM đã chạy:</Label>
                                  </Col>
                                  <Col xs="12" md="8">
                                  <Input type="text" name="text-input" placeholder="30000..." />
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
                    <Button color="primary" onClick={this.toggleSuccess}>Thêm</Button>{' '}
                    <Button color="secondary" onClick={this.toggleSuccess}>Huỷ</Button>
                  </ModalFooter>
                </Modal>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Khách hàng</th>
                    <th>Biển số xe</th>
                    <th>Loại xe</th>
                    <th>Màu xe</th>
                    <th>Năm sản xuất</th>
                    <th>Bảo hiểm ngày mua</th>
                    <th>Số km </th>
                    <th>Ngày tạo</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.receivedCars.map( (item, index) => { 
                        return ( 
                          <tr key={item.id}>
                            <td>{item.customer}</td>
                            <td>{item.licensePlate}</td>
                            <td>{item.carModel}</td>
                            <td>{item.carColor}</td>
                            <td>{item.carYear}</td>
                            <td>{item.insuranceTime}</td>
                            <td>{item.km}</td>
                            <td>{item.createdTime}</td>
                            <td>
                            <Dropdown isOpen={this.state.dropdownOpen[index]} toggle={() => {
                              this.toggle(index);
                            }}>
                              <DropdownToggle>
                                <i className="cui-options icons"></i>
                              </DropdownToggle>
                              <DropdownMenu style={{right: 'auto'}}>
                                <DropdownItem><i className="cui-pencil icons"></i>Sửa</DropdownItem>
                                <DropdownItem><i className="fa fa-remove"></i>Xoá</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                            </td>
                          </tr>
                        )
                      })

                    }
                  </tbody>
                </Table>
                <Form>
                  <input type="text" placeholder="Tìm kiếm" className="form-control" style={{ display: 'inline-block', width: 'auto' }}/>
                  <Pagination className="float-right">
                    <PaginationItem disabled><PaginationLink previous tag="button">Trước</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Sau</PaginationLink></PaginationItem>
                  </Pagination>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CarManager;