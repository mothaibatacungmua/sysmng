import APIBase from './base';
import $ from 'jquery';

const window_ = typeof window !== 'undefined' && window
const storage = window_.localStorage || {}

class AuthAPI extends APIBase{
  constructor(){
    super()
    this.endpoints = {
      OAUTH2_CALLBACK: this.host + "/login",
      GET_ME: this.host + "/me",
      LOGOUT: this.host + "/logout"
    }
  }

  loginWithGoogle(accessToken) {
    var params = {
      access_token: accessToken,
      grant_type: 'google'
    }
    return $.ajax({
      url: this.endpoints.OAUTH2_CALLBACK,
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

  getMe() {
    var user = this.getUser()
    if(!user){
      return null
    }
    return $.ajax({
      url: this.endpoints.GET_ME,
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(user)
    })
  }

  setUser(user_data) {
    if(!user_data) return user_data 
    if(!user_data.access_token) return user_data
    this.user = user_data
    storage.user = JSON.stringify(this.user)
    return this.user
  }

  getUser() {
    this.user = storage.user? JSON.parse(storage.user) : null
    return this.user
  }

  clearUser() {
    storage.user = null
  }

  logout() {
    return $.ajax({
      url: this.endpoints.LOGOUT,
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
  }
}

export { AuthAPI }