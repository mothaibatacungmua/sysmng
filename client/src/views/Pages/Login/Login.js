import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import AppConfigs from '../../../configs';
import { AuthAPI } from '../../../apis/auth';
import { DO_LOGIN } from '../../../actions';

class Login extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthAPI()
  }

  componentDidMount() {
    if(!this.props.isLoggedIn){
      var prom = this.auth.getMe()
      if (!prom) return;
      this.auth.setUser(prom)
      this.props.setLoggedIn()
    }
  }

  responseGoogle(response) {
    if(response.accessToken) {
      this.auth.loginWithGoogle(
        response.accessToken)
      .done(result => {
        this.auth.setUser(result)
        this.props.setLoggedIn()
      })
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h2>Hệ thống quản lý gara ô tô, bãi giữ xe, nhà trọ</h2>
                    <GoogleLogin
                      clientId={AppConfigs.oauth2.clientId}
                      buttonText="Đăng nhập với Google"
                      onSuccess={response => this.responseGoogle(response)}
                      onFailure={response => this.responseGoogle(response)}
                    />
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    redirectUrl: state.authReducer.redirectUrl
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLoggedIn: () => dispatch({type: DO_LOGIN})
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
