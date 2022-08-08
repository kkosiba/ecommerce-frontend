import React from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { authClearErrors, authSignup } from "../../store/actions/authActions";

import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";

const mapStateToProps = state => {
  return state.auth;
};

const mapDispatchToProps = dispatch => {
  return {
    authClearErrors: () => dispatch(authClearErrors()),
    authSignup: (email, password1, password2, first_name, last_name) =>
      dispatch(authSignup(email, password1, password2, first_name, last_name))
  };
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password2: "",
      first_name: "",
      last_name: ""
    };
  }

  componentDidMount() {
    this.props.authClearErrors();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.authSignup(
      this.state.email,
      this.state.password1,
      this.state.password2,
      this.state.first_name,
      this.state.last_name
    );
  };

  renderErrorMessage = error => {
    return error;
  };

  renderRegistrationForm = (token, error) => {
    // if there is no token, go to registration
    return token === null ? (
      <Row>
        <Col md="7" className="mx-auto card p-4">
          <Form onSubmit={e => this.handleSubmit(e)}>
            <h3 className="text-center font-weight-bold">Register</h3>
            <FormGroup>
              <Label
                for="firstName"
                className="d-flex flex-column flex-lg-row font-weight-bold"
              >
                <div>First name</div>
                <div className="ml-auto text-danger">
                  {error && error.response.data.first_name
                    ? this.renderErrorMessage(error.response.data.first_name)
                    : ""}
                </div>
              </Label>
              <Input
                id="firstName"
                type="text"
                onChange={e => this.setState({ first_name: e.target.value })}
                className="mb-2"
              />
            </FormGroup>

            <FormGroup>
              <Label
                for="lastName"
                className="d-flex flex-column flex-lg-row font-weight-bold"
              >
                <div>Last name</div>
                <div className="ml-auto text-danger">
                  {error && error.response.data.last_name
                    ? this.renderErrorMessage(error.response.data.last_name)
                    : ""}
                </div>
              </Label>
              <Input
                id="lastName"
                type="text"
                onChange={e => this.setState({ last_name: e.target.value })}
                className="mb-2"
              />
            </FormGroup>

            <FormGroup>
              <Label
                for="email"
                className="d-flex flex-column flex-lg-row font-weight-bold"
              >
                <div>Email address</div>
                <div className="ml-auto text-danger">
                  {error && error.response.data.email
                    ? this.renderErrorMessage(error.response.data.email)
                    : ""}
                </div>
              </Label>
              <Input
                id="email"
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                className="mb-2"
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="password1"
                className="d-flex flex-column flex-lg-row font-weight-bold"
              >
                <div>Password</div>
                <div className="ml-auto text-danger">
                  {error && error.response.data.password1
                    ? this.renderErrorMessage(
                        error.response.data.password1
                      ).map(item => (
                        <ul className="list-unstyled" key={item.id}>
                          <li>{item}</li>
                        </ul>
                      ))
                    : ""}
                </div>
              </Label>
              <Input
                id="password1"
                type="password"
                onChange={e => this.setState({ password1: e.target.value })}
                className="mb-2"
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="password2"
                className="d-flex flex-column flex-lg-row font-weight-bold"
              >
                <div>Confirm password</div>
                <div className="ml-auto text-danger">
                  {error && error.response.data.non_field_errors
                    ? this.renderErrorMessage(
                        error.response.data.non_field_errors
                      )
                    : ""}
                </div>
              </Label>
              <Input
                id="password2"
                type="password"
                onChange={e => this.setState({ password2: e.target.value })}
                className="mb-4"
              />
            </FormGroup>

            <div className="text-center">
              <Button color="primary" type="submit">
                Register
              </Button>
              <p className="mt-4">
                Already a member? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    ) : (
      <Redirect to="/" />
    );
  };

  render() {
    const { token, error } = this.props;

    return (
      <React.Fragment>
        {this.renderRegistrationForm(token, error)}
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
