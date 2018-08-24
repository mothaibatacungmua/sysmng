import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register, EnsureLoggedIn } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

const window_ = typeof window !== 'undefined' && window

class App extends Component {
  componentDidUpdate(prevProps){
    const { redirectUrl } = this.props
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

    if (isLoggingIn) {
      // this.props.history.push(redirectUrl)
      var hash = redirectUrl
      if(redirectUrl.length > 1){
        hash = hash.slice(1)
      }
      window_.location.hash = hash
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
      window_.location.hash = "login"
    }
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <EnsureLoggedIn>
            <Route path="/" name="Home" component={DefaultLayout} />
          </EnsureLoggedIn>
        </Switch>
      </HashRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    redirectUrl: state.authReducer.redirectUrl
  }
}

export default connect(mapStateToProps, null)(App)
