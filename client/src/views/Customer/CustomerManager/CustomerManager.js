import React, { Component } from 'react';
import moment from 'moment';
import { Button, Badge, Card, CardBody, CardHeader, Col, 
    Pagination, PaginationItem, PaginationLink, Row, Table,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form } from 'reactstrap';
import { CustomerAPI } from '../../../apis/customer';
import AddNewUserModal from './AddNewUserModal';
import EditUserModal from './EditUserModal';
import ViewDetailUserModal from './ViewDetailUserModal';


const PAGE_SIZE = 10;

class CustomerManager extends Component {
  constructor(props) {
    super(props)
    
    this.customerAPI = new CustomerAPI();
    this.state = {
      dropdownOpen: new Array(PAGE_SIZE).fill(false),
      customers: [],
      newUserModalOpen: false,
      editUserModalOpen: false,
      viewDetailUserModalOpen: false,
      newCustomer:{ id:'', fullname: '', email: '', phone: '', birthday: '', note: '' },
      editCustomer:{ id: '', fullname: '', email: '', phone: '', birthday: '', note: '' },
      viewCustomer:{ id: '', fullname: '', email: '', phone: '', birthday: '', note: '' },
      editCustomerIndex: -1,
      displayError:null,
      totalCustomers: 0,
      currentPage: 1
    };
    
    this.activeIdx = 1;
    this.pageSize = PAGE_SIZE;

    /* method binding */
    this.toggle = this.toggle.bind(this);
    this.toggleNewUserModal = this.toggleNewUserModal.bind(this);
    this.toggleEditUserModal = this.toggleEditUserModal.bind(this);
    this.toggleViewDetailUserModal = this.toggleViewDetailUserModal.bind(this);
    this.submitCallBack = this.submitCallBack.bind(this);
    this.updateCallback = this.updateCallback.bind(this);
  }

  componentDidMount() {
    // counting to create pagination
    this.customerAPI
      .count()
      .done(result => {
        if (!result.errCode){
          this.setState({totalCustomers: result.number})
        }
      })
    
    // render customer in the first page
    this.customerAPI
      .list({limit: PAGE_SIZE})
      .done(result => {
        if (!result.errCode){
          this.setState({
            customers: result,
            currentPage: 1
          })
        }
      })
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  toggleNewUserModal() {
    this.setState({
      newUserModalOpen: !this.state.newUserModalOpen,
    });
  }

  toggleEditUserModal() {
    this.setState({
      editUserModalOpen: !this.state.editUserModalOpen,
    });
  }

  toggleViewDetailUserModal() {
    this.setState({
      viewDetailUserModalOpen: !this.state.viewDetailUserModalOpen
    });
  }

  handleEditUser(index) {
    this.setState({
      editUserModalOpen: !this.state.editUserModalOpen,
      editCustomer: this.state.customers[index]
    })
  }

  handleDeleteUser(index) {
    var customers = this.state.customers;
    
    this.customerAPI.delete({customer_id: customers[index].id})

    customers.splice(index, 1);
    this.setState({
      customers: customers,
      totalCustomers: this.state.totalCustomers - 1
    })
  }

  handleViewDetailUser(index) {
    this.setState({
      viewDetailUserModalOpen: !this.state.viewDetailUserModalOpen,
      viewCustomer: this.state.customers[index]
    })
  }

  createPaginationItems(pageMaxIndex, totalPages) {
    var elems = [];
    for(var i=1; i <= pageMaxIndex; i++){
      elems.push((
      <PaginationItem key={i}>
        <PaginationLink tag="button" onClick={this.handleClickPagination.bind(this, i)}>{i}</PaginationLink>
      </PaginationItem>))
    }
    if (totalPages > pageMaxIndex) {
      elems.push((<PaginationItem>...</PaginationItem>))
      elems.push((
        <PaginationItem key={totalPages}>
          <PaginationLink tag="button" onClick={this.handleClickPagination.bind(this, totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      ))
    }

    return elems
  }

  handleClickPagination(pageId){
    var page = this.state.currentPage;
    var totalPages = Math.floor(this.state.totalCustomers / this.pageSize) + 1;

    if(pageId === "prev" && this.state.currentPage === 1)return;
    if(pageId === "next" && this.state.currentPage === totalPages) return;

    switch(pageId){
      case "prev":
        page -= 1;
        break;
      case "next":
        page += 1;
        break;
      default:
        page = pageId;
        break;
    }

    // render customer in the first page
    var offset = (page - 1) * PAGE_SIZE;
    var limit = PAGE_SIZE;

    this.customerAPI
      .list({offset: offset, limit: limit})
      .done(result => {
        if (!result.errCode){
          this.setState({
            customers: result,
            currentPage: page
          })
        }
      })
  }

  submitCallBack(newCustomer) {
    this.handleClickPagination(1);
    var customers = this.state.customers;
    customers.unshift(newCustomer);

    this.setState({
      newUserModalOpen: !this.state.newUserModalOpen,
      totalCustomers: this.state.totalCustomers + 1,
      customers: customers
    });
  }

  updateCallback(edittedCustomerIndex, edittedCustomer){
    var customers = this.state.customers;
    customers[edittedCustomerIndex] = edittedCustomer;

    this.setState({
      editUserModalOpen: !this.state.editUserModalOpen,
      customers: customers
    })
    //TODO: call api to change user information
  }

  render() {
    var totalPages = Math.floor(this.state.totalCustomers / this.pageSize) + 1;
    var pageMaxIndex = Math.min(totalPages, 4);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> <b>Khách hàng</b>
                <Button active onClick={this.toggleNewUserModal} color="success" aria-pressed="true" className="card-header-actions"><i className="fa fa-plus"> Thêm mới</i></Button>
                <AddNewUserModal 
                  parent={this} 
                  isOpen={this.state.newUserModalOpen} 
                  toggleNewUserModal={this.toggleNewUserModal} 
                  submitCallback={this.submitCallBack} 
                />
                <EditUserModal
                  parent={this} 
                  isOpen={this.state.editUserModalOpen}
                  customer={this.state.editCustomer}
                  customerIndex={this.editCustomerIndex}
                  toggleEditUserModal={this.toggleEditUserModal}
                  updateCallback={this.updateCallback}
                />
                <ViewDetailUserModal
                  parent={this} 
                  isOpen={this.state.viewDetailUserModalOpen}
                  customer={this.state.viewCustomer}
                  toggleViewDetailUserModal={this.toggleViewDetailUserModal}
                />
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Ngày sinh</th>
                    <th>Ngày tạo</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.customers.map( (item, index) => { 
                        return ( 
                          <tr key={item.id}>
                            <td>{item.fullname}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{moment(item.birthday).format('DD-MM-YYYY')}</td>
                            <td>{moment(item.created_at).format('DD-MM-YYYY')}</td>
                            <td>
                            <Dropdown isOpen={this.state.dropdownOpen[index]} toggle={() => {
                              this.toggle(index);
                            }}>
                              <DropdownToggle>
                                <i className="cui-options icons"></i>
                              </DropdownToggle>
                              <DropdownMenu style={{right: 'auto'}}>
                                <DropdownItem onClick={this.handleEditUser.bind(this, index)}><i className="cui-pencil icons"></i>Sửa</DropdownItem>
                                <DropdownItem onClick={this.handleDeleteUser.bind(this, index)}><i className="fa fa-remove"></i>Xoá</DropdownItem>
                                <DropdownItem onClick={this.handleViewDetailUser.bind(this, index)}><i className="fa fa-eye"></i>Chi tiết</DropdownItem>
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
                    <PaginationItem>
                      <PaginationLink previous tag="button" onClick={this.handleClickPagination.bind(this, 'prev')}>Trước</PaginationLink>
                    </PaginationItem>
                    {this.createPaginationItems(pageMaxIndex)}
                    <PaginationItem>
                      <PaginationLink next tag="button" onClick={this.handleClickPagination.bind(this, 'next')}>Sau</PaginationLink>
                    </PaginationItem>
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

export default CustomerManager;