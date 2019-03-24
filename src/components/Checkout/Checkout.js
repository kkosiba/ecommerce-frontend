import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Prompt } from "react-router-dom";
import { connect } from "react-redux";
import {
  setPayment,
  toggleCheckoutComplete,
  emptyCart
} from "../../store/actions/storeActions";
import Address from "./Address";
import Delivery from "./Delivery";
import Payment from "./Payment";
import OrderReview from "./OrderReview";
import OrderFinal from "./OrderFinal";
import OrderSummary from "./OrderSummary";
import CheckoutNavbar from "./CheckoutNavbar";
import { Row, Col } from "reactstrap";
import { API_PATH } from "../../backend_url";
import { injectStripe } from "react-stripe-elements";
import { reset } from "redux-form";
import "./css/checkout.css";

const mapStateToProps = state => {
  return {
    store: state.store,
    isAuthenticated: state.auth.token !== null
  };
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

const mapShippingStringToNumeric = value => {
  switch (value) {
    case "free":
    case "collection":
      return 0.0;
    case "express":
      return 10.0;
    default:
      return 5.0;
  }
};

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handlePayment = this.handlePayment.bind(this);

    this.state = {
      page: 1
    };
  }

  componentDidMount() {
    const { cart } = this.props.store;
    try {
      const serializedCart = JSON.stringify(cart);
      localStorage.setItem("cart", serializedCart);
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    // this.props.resetCheckoutForm();
    if (this.props.isCheckoutComplete) this.props.toggleCheckoutComplete();
    this.props.setPayment("");
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  calculateTotal() {
    const { subtotal, tax, shipping } = this.props.store;
    const shippingNumeric = mapShippingStringToNumeric(shipping);
    const afterTax = tax * subtotal;
    return parseFloat(subtotal + afterTax + shippingNumeric).toFixed(2);
  }

  handlePayment(values) {
    const total = this.calculateTotal();
    const { firstName, lastName } = values.shippingAddress;

    return this.props.stripe
      .createToken({ name: firstName + " " + lastName })
      .then(res => {
        try {
          let formData = new FormData();
          formData.append("amount", total * 100); // *100 because stripe processes pence
          formData.append("currency", "GBP");
          formData.append("source", res.token.id);
          return fetch(`${API_PATH}payments/`, {
            method: "POST",
            headers: {
              accept: "application/json"
            },
            body: formData
          }).then(res => {
            if (res.ok) {
              this.props.setPayment("success");
              this.props.emptyCart();
            } else {
              this.props.setPayment("error");
            }
            this.props.toggleCheckoutComplete();
          });
        } catch (err) {
          console.log(err);
          this.props.toggleCheckoutComplete();
          this.props.setPayment("error");
        }
      });
  }

  render() {
    const { page } = this.state;
    const { cart, isCheckoutComplete } = this.props.store;
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      if (isCheckoutComplete) {
        return <OrderFinal />;
      } else if (cart.length === 0) {
        return (
          <React.Fragment>
            <h3 className="text-center mt-2">
              Add some products to the cart first, then come back here :)
            </h3>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            {/* <Prompt message="Are you sure you want to leave? Your checkout data will be lost." /> */}
            <h3 className="mb-4">Checkout</h3>
            <Row>
              <Col lg="8">
                <CheckoutNavbar active={page} />
                {page === 1 && <Address onSubmit={this.nextPage} />}
                {page === 2 && (
                  <Delivery
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />
                )}
                {page === 3 && (
                  <OrderReview
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />
                )}
                {page === 4 && (
                  <Payment
                    previousPage={this.previousPage}
                    onSubmit={this.handlePayment}
                  />
                )}
              </Col>
              <div className="col-lg-4">
                <OrderSummary />
              </div>
            </Row>
          </React.Fragment>
        );
      }
    } else {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="font-weight-bold">
            You must be logged in to view this page.
          </h1>
        </div>
      );
    }
  }
}

Checkout.propTypes = {
  cart: PropTypes.array,
  isCheckoutComplete: PropTypes.bool,
  resetCheckoutForm: PropTypes.func.isRequired,
  setPayment: PropTypes.func.isRequired,
  toggleCheckoutComplete: PropTypes.func.isRequired
};

Checkout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);

export default injectStripe(Checkout);
