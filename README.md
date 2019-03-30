# ecommerce-frontend
React+Redux frontend for eCommerce project

Features
--------
1. Fully operational shopping cart: adding & removing products, incrementing/decrementing quantity of an item in cart (limited by stock availibility), clearing cart.
2. Three-step checkout process with a selection of shipping address, delivery method and payment method (currently only card payments via [Stripe](https://stripe.com/) are supported).

## How to set up

For the frontend it is enough to run

`npm install`

to install all dependencies. Then, one can run frontend on `localhost:3000` by issuing

`npm start`

<!-- For PayPal to work, one needs to provide `REACT_APP_PAYPAL_SANDBOX_ID` environment variable in `frontend/.env.development`. The ID can be obtained [here](https://developer.paypal.com/developer/accounts/). -->