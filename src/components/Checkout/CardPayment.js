import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setPayment,
  emptyCart,
  toggleCheckoutComplete
} from "../../store/actions/storeActions";
import { Field, reset } from "redux-form";
import RenderField from "./RenderField";
import { FormGroup, Row, Col } from "reactstrap";


const mapStateToProps = state => {
  return state.store;
};

const mapDispatchToProps = dispatch => {
  return {
    setPayment: value => dispatch(setPayment(value)),
    // placeOrder: values => dispatch(placeOrder(values)), // NOT YET IMPLEMENTED
    // updateStock: data => dispatch(updateStock(data)), // NOT YET IMPLEMENTED
    emptyCart: () => dispatch(emptyCart()),
    toggleCheckoutComplete: () => dispatch(toggleCheckoutComplete()),
    resetCheckoutForm: () => dispatch(reset("checkout"))
  };
};

class CardPayment extends Component {
  render() {
    return (
      <Row>
        <Col md="12">
          <FormGroup>
            <Field
              name="cardNumber"
              type="text"
              component={RenderField}
              label="Card Number"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Field
              name="expirationDate"
              type="text"
              component={RenderField}
              label="Expiration Date"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Field name="cvv" type="text" component={RenderField} label="CVV" />
          </FormGroup>
        </Col>
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardPayment);
