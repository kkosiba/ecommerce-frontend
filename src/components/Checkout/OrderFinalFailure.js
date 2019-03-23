import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setPayment,
  toggleCheckoutComplete
} from "../../store/actions/storeActions";

const mapStateToProps = state => {
  return state.store;
};

const mapDispatchToProps = dispatch => {
  return {
    setPayment: value => dispatch(setPayment(value)),
    toggleCheckoutComplete: () => dispatch(toggleCheckoutComplete())
  };
};

class OrderFinalFailure extends Component {
  componentWillUnmount() {
    if (this.props.isCheckoutComplete) this.props.toggleCheckoutComplete();
    this.props.setPayment("");
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="font-weight-bold">
          Your order was not completed due to an error.
        </h1>
        <h3>Please try again.</h3>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderFinalFailure);
