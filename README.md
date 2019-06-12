# ecommerce-frontend
React+Redux frontend for eCommerce project. 

The deployed version is available on [Heroku](https://ecommerce-frontend-react.herokuapp.com/). Sample testing credentials: `(test@abc.com, testpassword)`

Features
--------
1. Fully operational shopping cart: adding & removing products, incrementing/decrementing quantity of an item in cart (limited by stock availibility), clearing cart.
2. Three-step checkout process with a selection of shipping address, delivery method and payment method (currently only card payments via [Stripe](https://stripe.com/) are supported).

## How to set up

For the frontend it is enough to run

`npm install`

to install all dependencies. Then, one can run frontend on `localhost:3000` by issuing

`npm start`
