import { DO_LOGIN, DO_LOGOUT, SET_URL_REDIRECT } from '../actions'

const authReducer=(state = {isLoggedIn: false, redirectUrl:''}, action) =>{
  switch (action.type) {
    case DO_LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true
      })
    case DO_LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false
      })
    case SET_URL_REDIRECT:
      return Object.assign({}, state, {
        isLoggedIn: false, redirectUrl: action.redirectUrl
      })
    default:
      return state
  }
}

export default authReducer