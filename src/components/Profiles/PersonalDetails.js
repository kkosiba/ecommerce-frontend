import React, { Component } from "react";
// import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode"; // for decoding JWT tokens

import { Input, Button, Row, Col } from "reactstrap";

const mapStateToProps = state => {
  return state.auth;
};

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: jwt_decode(this.props.token).email,
      password: ""
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderPersonalDetails = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <Row className="mx-auto card w-100 p-4">
          <h3 className="text-center font-weight-bold">Personal Details</h3>
          <Col md="6" className="" left>
            <Input
              label="First name"
              type="text"
              value="tbi..."
              disabled
              className="mb-2"
            />

            <Input
              label="Last name"
              type="text"
              value="tbi..."
              disabled
              className="mb-2"
            />

            <Input
              label="Email"
              type="email"
              value={this.state.email}
              className="mb-2"
              onChange={e => this.setState({ last_name: e.target.value })}
            />
          </Col>

          <Col md="6">
            <Input
              label="Password"
              type="password"
              onChange={e => this.setState({ password1: e.target.value })}
              className="mb-2"
            />

            <Input
              label="Confirm password"
              type="password"
              id="password2"
              onChange={e => this.setState({ password2: e.target.value })}
              className="mb-2"
            />
          </Col>
          <div className="text-center">
            <Button color="primary" type="submit">
              Update
            </Button>
          </div>
        </Row>
      </form>
    );
  };

  render() {
    // const { token } = this.props;
    return (
      <React.Fragment>
        {/* if any error occurs after form is submitted... */}
        {/* {this.state.error ? this.renderErrorMessage() : ""} */}
        {this.renderPersonalDetails()}
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(PersonalDetails);
