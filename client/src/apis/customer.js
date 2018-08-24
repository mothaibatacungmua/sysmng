import APIBase from './base';
import $ from 'jquery';


class CustomerAPI extends APIBase{
  constructor(){
    super()
    var bluesprint = '/customer'
    this.endpoints = {
      CREATE: this.host + bluesprint + "/create",
      LIST: this.host + bluesprint + "/list",
      UPDATE: this.host + bluesprint + "/update",
      DELETE: this.host + bluesprint + "/delete",
      COUNT: this.host + bluesprint + "/count"
    }
  }

  create(customerData){
    /* create customer */
    return $.ajax({
      url: this.endpoints.CREATE,
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(customerData)
    })
  }

  count(){
    /* counting all customers */
    return $.ajax({
      url: this.endpoints.COUNT,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  list(params){
    /* list customer with offset and limit */
    return $.ajax({
      url: this.endpoints.LIST,
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(params)
    })
  }

  delete(params){
    return $.ajax({
      url: this.endpoints.DELETE,
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(params)
    })
  }
}

export { CustomerAPI };