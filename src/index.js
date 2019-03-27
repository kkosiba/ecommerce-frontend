import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { history } from "./history";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { LastLocationProvider } from "react-router-last-location";

const app = (
  <Provider store={store}>
    <Router history={history}>
      <LastLocationProvider>
        <App />
      </LastLocationProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
