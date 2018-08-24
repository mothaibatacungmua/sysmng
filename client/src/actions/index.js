/*
 * action types
 */

export const DO_LOGIN = 'DO_LOGIN'
export const DO_LOGOUT = 'DO_LOGOUT'
export const SET_URL_REDIRECT = 'SET_URL_REDIRECT'

/*
 * action creators
 */
export function doLogin() {
  return { type: DO_LOGIN }
}

export function doLogout() {
  return { type: DO_LOGOUT }
}

export function setRedirectUrl(redirectUrl) {
  return {type: SET_URL_REDIRECT, redirectUrl: redirectUrl}
}