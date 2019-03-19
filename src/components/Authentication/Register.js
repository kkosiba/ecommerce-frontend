import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { authSignup } from "../../store/actions/authActions";

import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";

const mapStateToProps = state => {
  return state.auth;
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password1, password2, first_name, last_name) =>
      dispatch(
        authSignup(email, password1, password2, first_name, last_name)
      )
  };
};

class Register extends Component {
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.email,
      this.state.password1,
      this.state.password2,
      this.state.first_name,
      this.state.last_name
    );
  };

  render() {
    const { token } = this.props;

    return token === null ? (
      <React.Fragment>
        <Row>
          <Col md="6" className="mx-auto card p-4">
            <Form onSubmit={e => this.handleSubmit(e)}>
              <h3 className="text-center font-weight-bold">Register</h3>
              <FormGroup>
                <Label for="firstName">
                  <strong>First name</strong>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  onChange={e => this.setState({ first_name: e.target.value })}
                  className="mb-2"
                />
              </FormGroup>

              <FormGroup>
                <Label for="lastName">
                  <strong>Last name</strong>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  onChange={e => this.setState({ last_name: e.target.value })}
                  className="mb-2"
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">
                  <strong>Email address</strong>
                </Label>
                <Input
                  id="email"
                  type="email"
                  onChange={e => this.setState({ email: e.target.value })}
                  className="mb-2"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password1">
                  <strong>Password</strong>
                </Label>
                <Input
                  id="password1"
                  type="password"
                  onChange={e => this.setState({ password1: e.target.value })}
                  className="mb-2"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password2">
                  <strong>Confirm password</strong>
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
      </React.Fragment>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
