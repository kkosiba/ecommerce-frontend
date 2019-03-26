import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart
} from "../../store/actions/storeActions";
import { API_PATH } from "../../backend_url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Default from "../Misc/Default";
import { Spinner } from "reactstrap";
import "./css/products.css";

const mapStateToProps = state => {
  return state.store;
};

function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: item => dispatch(addProductToCart(item, 1)),
    removeProductFromCart: item => dispatch(removeProductFromCart(item))
  };
}

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: true,
      error: null,
      selectValue: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`${API_PATH}products/${params.slug}`)
      .then(res => this.setState({ product: res.data, loading: false }))
      .catch(err => this.setState({ error: err, loading: false }));
  }

  inCart = () => {
    const { cart } = this.props;
    const res = cart.find(e => e.id === this.state.product.id);
    return res ? res.quantity : 0;
  };

  quantityRange = product => {
    let result = [];
    if (product.quantity > 0) {
      for (let i = 1; i <= product.quantity; i++) {
        result.push(i);
      }
      return result;
    }
    return result;
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ selectValue: e.target.value });
  };

  addMultiple = (item, qnt) => {
    for (let i = 0; i < qnt; i++) {
      this.props.addProductToCart(item);
    }
  };

  render() {
    const { product, loading, error } = this.state;

    if (error) {
      return <Default />;
    } else {
      if (loading) {
        return (
          <Spinner
            color="secondary"
            style={{ width: "3rem", height: "3rem" }}
            className="m-auto"
          />
        );
      } else {
        const productQuantityRange = this.quantityRange(product);

        return (
          <div className="row">
            <div className="col-md-6">
              <div className="card rounded-0">
                <img
                  className="w-100 rounded-0"
                  src={product.picture}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="card rounded-0">
                <div className="card-body">
                  <h3 className="font-weight-bold">{product.name}</h3>
                  <p className="card-text pt-2">{product.description}</p>
                  <p className="card-text pt-2">
                    <strong>Price:</strong> £{product.price}
                  </p>
                  <p className="card-text py-3 border-bottom">
                    <strong>Availability:</strong>
                    {product.quantity > 0
                      ? product.quantity > 20
                        ? " Plenty in stock!"
                        : " Just a few left!"
                      : " Out of stock"}
                  </p>

                  <div className="input-group justify-content-center">
                    <div className="input-group-prepend">
                      <button className="btn btn-info" type="button">
                        <Link to="/" className="text-white">
                          <FontAwesomeIcon icon="list-alt" /> Products
                        </Link>
                      </button>
                    </div>
                    {product.quantity === 0 ? (
                      <div className="input-group-append">
                        <button className="btn btn-success" disabled>
                          <FontAwesomeIcon icon="cart-plus" />
                        </button>
                      </div>
                    ) : (
                      <div className="input-group-append">
                        <select
                          className="form-control rounded-0"
                          value={this.state.selectValue}
                          onChange={this.handleChange}
                        >
                          {productQuantityRange
                            .slice(0, 10) // add no more than 10 items to cart regardless of the available amount
                            .map(item => (
                              <option value={item} key={item}>
                                {item}
                              </option>
                            ))}
                        </select>
                        <button
                          type="submit"
                          className="btn btn-success"
                          onClick={() =>
                            this.addMultiple(product, this.state.selectValue)
                          }
                        >
                          <FontAwesomeIcon icon="cart-plus" />
                        </button>
                        {this.inCart() > 0 ? (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                              this.props.removeProductFromCart(product)
                            }
                          >
                            <FontAwesomeIcon icon="trash-alt" />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

ProductDetails.propTypes = {
  cart: PropTypes.array,
  addProductToCart: PropTypes.func.isRequired,
  removeProductFromCart: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
