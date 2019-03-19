import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";

import { connect } from "react-redux";
import * as auth from "../../store/actions/auth";

import PersonalDetails from "./PersonalDetails";
import BillingAddress from "./BillingAddress";
import DeliveryAddress from "./DeliveryAddress";

import PrivateRoute from "../Utilities/PrivateRoute";

const mapStateToProps = state => {
  return state.auth;
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(auth.authLogin(username, password))
  };
};

class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <Router basename="/profile">
          <div className="row">
            <div className="col-md-3">
              <ul className="list-unstyled">
                <li>
                  <Link to="/">Personal details</Link>
                </li>
                <li>
                  <Link to="/billing">Billing details</Link>
                </li>
                <li>
                  <Link to="/delivery">Delivery details</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-9">
            <Switch>
              <PrivateRoute exact path="/" component={PersonalDetails} />
              <PrivateRoute path="/billing" component={BillingAddress} />
              <PrivateRoute path="/delivery" component={DeliveryAddress} />
            </Switch>
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
