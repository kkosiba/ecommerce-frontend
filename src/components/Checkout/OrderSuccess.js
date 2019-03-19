import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import * as actions from "../../store/actions/storeActions";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Row, Col } from "reactstrap";
import { toggleCheckoutComplete } from "../../store/actions/storeActions";

import { formValueSelector } from "redux-form";

const selector = formValueSelector("checkout");

// const fields = [
//   "firstName",
//   "lastName",
//   "city",
//   "street",
//   "postcode",
//   "phoneNumber"
// ];
// const invoiceAddress = fields.map(item => "invoiceAddress." + item);
// const shippingAddress = fields.map(item => "shippingAddress." + item);

const mapStateToProps = state => {
  return {
    store: state.store,
    formData: selector(
      state,
      "shippingAddress",
      "billingAddress",
      // ...invoiceAddress,
      // ...shippingAddress,
      // "isDifferentShipping",
      "shipping"
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCheckoutComplete: () => dispatch(toggleCheckoutComplete())
  };
};

class OrderSuccess extends Component {

  saveCart = cart => {
    try {
      const serializedCart = JSON.stringify(cart);
      localStorage.setItem("cart", serializedCart);
    } catch (err) {
      console.log(err);
    }
  };

  loadCart = () => {
    try {
      const serializedCart = localStorage.getItem("cart");
      if (serializedCart === null) {
        return undefined;
      }
      return JSON.parse(serializedCart);
    } catch (err) {
      return undefined;
    }
  };

  removeCart = () => {
    localStorage.removeItem("cart");
  };

  render() {
    const { shippingAddress, billingAddress, shipping } = this.props.formData;
    const cart = this.loadCart();

    return (
      <React.Fragment>
        <h1 className="text-center">
          Thank you for your order, {shippingAddress.firstName}!
        </h1>
        <h3 className="text-center my-3">Order Summary</h3>
        <div className="bg-light p-4 cart">
          <div className="cart-wrapper">
            <div className="cart-header text-uppercase text-center font-weight-bold">
              <div className="row">
                <div className="col-5">Item</div>
                <div className="col-2">Price</div>
                <div className="col-2">Quantity</div>
                <div className="col-2">Total</div>
              </div>
            </div>
            <div className="cart-body">
              {cart.map((item, index) => (
                <div className="p-4 border-top" key={item.id}>
                  <div className="row d-flex align-items-center text-center">
                    <div className="col-5">
                      <div className="d-flex align-items-center">
                        <img
                          className="product-image"
                          alt={item.name}
                          src={item.picture}
                        />
                        <span className="cart-title">{item.name}</span>
                      </div>
                    </div>
                    <div className="col-2">£{item.price}</div>
                    <div className="ml-2 col-2">{item.quantity}</div>
                    <div className="ml-1 col-2 text-center">
                      £{parseFloat(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex px-2 my-1">
            <span>Order Subtotal</span>
            <span className="ml-auto">
              £{parseFloat(this.props.store.subtotal).toFixed(2)}
            </span>
          </div>
          <hr />
          <div className="d-flex px-2 my-1">
            <span>Tax (20%)</span>
            <span className="ml-auto">
              £{parseFloat(cart.afterTax).toFixed(2)}
            </span>
          </div>
          <hr />
          <div className="d-flex px-2 my-1">
            <span>Total</span>
            <span className="ml-auto font-weight-bold">
              £{parseFloat(cart.totalPrice).toFixed(2)}
            </span>
          </div>
        </div>
        <h3 className="text-center my-3">Delivery Details</h3>
        Your delivery option is <strong>{shipping}</strong>.
        <div className="d-flex flex-column">
          <div className="d-flex p-4">
            <h5 className="font-weight-bold">Invoice Address</h5>
            <p>
              {shippingAddress.firstName +
                " " +
                shippingAddress.lastName +
                ",\n" +
                shippingAddress.street +
                ", " +
                shippingAddress.postcode +
                " " +
                shippingAddress.city}
            </p>
          </div>
          <div className="d-flex p-4">
            <h5 className="font-weight-bold">Shipping Address</h5>
            {shippingAddress !== undefined ? (
              <p>
                {shippingAddress.firstName +
                  " " +
                  shippingAddress.lastName +
                  ",\n" +
                  shippingAddress.street +
                  ", " +
                  shippingAddress.postcode +
                  " " +
                  shippingAddress.city}
              </p>
            ) : (
              <p>Same as the invoice address.</p>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  //       <div className="d-flex">
  //         <Button
  //           type="button"
  //           className="ml-auto btn btn-sm btn-dark"
  //           onClick={this.finalize}
  //         >
  //           Back to store
  //         </Button>
  //       </div>
  //     </div>
  //   </React.Fragment>
  // );
}

OrderSuccess.propTypes = {
  store: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  emptyCart: PropTypes.func.isRequired,
  resetCheckoutform: PropTypes.func.isRequired,
  toggleCheckoutComplete: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSuccess);
