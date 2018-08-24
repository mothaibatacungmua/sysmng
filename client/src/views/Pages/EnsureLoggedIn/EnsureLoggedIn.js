import { Component } from 'react';
import { connect } from 'react-redux';
import { setRedirectUrl, doLogin } from '../../../actions';
import { withRouter } from "react-router";
import { AuthAPI } from '../../../apis/auth';


const window_ = typeof window !== 'undefined' && window

class EnsureLoggedInContainer extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthAPI()
  }

  componentDidMount() {
    const { dispatch, currentURL } = this.props
    if (!this.props.isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      dispatch(setRedirectUrl(currentURL))
      var prom = this.auth.getMe()
      if (!prom) {
        this.props.history.replace("/login")
      }else{
        this.auth.setUser(prom)
        dispatch(doLogin())
      }
    }
  }
  
  render() {
    if (this.props.isLoggedIn) {
      console.log('dit nhau', this.props.isLoggedIn)
      return this.props.children
    } else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    currentURL: ownProps.location.pathname
  }
}

export default withRouter(connect(mapStateToProps, null)(EnsureLoggedInContainer));