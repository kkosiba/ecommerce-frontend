import React from "react";
import { Redirect, Link } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";
import { connect } from "react-redux";
import { authClearErrors, authLogin } from "../../store/actions/authActions";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Spinner
} from "reactstrap";

const mapStateToProps = state => {
  return state.auth;
};

const mapDispatchToProps = dispatch => {
  return {
    authClearErrors: () => dispatch(authClearErrors()),
    authLogin: (email, password) => dispatch(authLogin(email, password))
  };
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false
    };
  }

  componentDidMount() {
    this.props.authClearErrors();
  }

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.authLogin(this.state.email, this.state.password);
    if (!this.props.error) this.setState({ redirectToReferrer: true });
  };

  renderErrorMessage = () => {
    return (
      <h5 className="text-danger text-center mb-3 font-weight-bold">
        Invalid credentials!
      </h5>
    );
  };

  renderLoginForm = token => {
    // if there is no token, go to login
    return token === null ? (
      <Row>
        <Col md="7" className="mx-auto card p-4">
          <Form onSubmit={e => this.handleSubmit(e)}>
            <h3 className="text-center font-weight-bold">Login</h3>
            <FormGroup>
              <Label for="email">
                <strong>Email address</strong>
              </Label>
              <Input
                placeholder="Enter email"
                id="email"
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                className="mb-2"
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">
                <strong>Password</strong>
              </Label>
              <Input
                placeholder="Enter password"
                id="password"
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                className="mb-2"
              />
            </FormGroup>

            <div className="text-center">
              <Button color="primary" type="submit">
                Login
              </Button>
              <div className="d-flex justify-content-between flex-column flex-lg-row mt-4">
                <span>
                  <Link to="/password_reset">Forgot your password?</Link>
                </span>
                <span>
                  Don't have an account? <Link to="/register">Register</Link>
                </span>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    ) : (
      // otherwise redirect to /
      <Redirect to="/" />
    );
  };

  render() {
    const { token, error, loading } = this.props;
    let { from } = this.props.location.state || {
      from: { pathname: this.props.lastLocation.pathname }
    };
    let { redirectToReferrer } = this.state;

    return loading ? (
      <Spinner
        color="secondary"
        style={{ width: "3rem", height: "3rem" }}
        className="m-auto"
      />
    ) : redirectToReferrer && !error ? (
      <Redirect to={from} />
    ) : (
      <React.Fragment>
        {error ? this.renderErrorMessage() : ""}
        {this.renderLoginForm(token)}
      </React.Fragment>
    );
  }
}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default withLastLocation(Login);
