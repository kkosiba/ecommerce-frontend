import React, { Component } from "react";
import axios from "axios";
import { API_PATH } from "../../backend_url";

import { connect } from "react-redux";
// import * as actions from "../../store/actions";

const mapStateToProps = state => {
  return { token: state.token };
};

class BillingAddress extends Component {
  state = {
    addresses: [
      // {
      //     "id": 1,
      //     "address_name": "address1",
      //     "address_line_1": "12 Lovely Avenue",
      //     "address_line_2": "sdfsaf",
      //     "country": "United Kingdom",
      //     "city": "London",
      //     "postcode": "EC1 4YI",
      //     "owner": 1
      // }
    ]
  };

  componentDidMount() {
    axios
      .get(`${API_PATH}addresses/billing_details/`)
      // , {
      //   headers: {
      //     "Authorization": "JWT " + this.props.token
      //   }
      // })
      .then(res => this.setState({ addresses: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { addresses } = this.state;
    // console.log(addresses);
    return (
      <React.Fragment>
        <h3>My billing details</h3>
        <table className="table table-responsive">
          {addresses.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.address_name}</td>
              <td>
                <div className="d-flex flex-column">
                  <span>{item.address_line_1}</span>
                  <span>{item.address_line_2}</span>
                </div>
              </td>
              <td>{item.country}</td>
              <td>{item.city}</td>
              <td>{item.postcode}</td>
            </tr>
          ))}
        </table>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(BillingAddress);
