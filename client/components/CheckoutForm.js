import React from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
// import { fetchUserOrder } from '../store/redux-order';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
class Checkout extends React.Component {
  render() {
    const { pristine, reset, submitting } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
          <Grid>
            {' '}
            <div>
              <button
                type="submit"
                disabled={submitting}
                // onClick={(event) => this.handleSubmit(event)}
              >
                Submit
              </button>
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear Values
              </button>

              <div>
                <button type="button">Cancel</button>
              </div>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
export default Checkout;
// class Checkout extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   // const orderId = this.props.match.params.orderId;
//   //match whatever is requested inside the url bar because of how we defined the wild card in the route component
//   //this.props.userOrder(orderId);

//   //getting a order and assigning it to state
//   //Get user Cart?
//   //handleSubmit will send order to Stripe? and order id to confirmation page
//   //is checkout toggle
//   //grab order via order Id put
//   //   handleSubmit = async (event) => {
//   //     event.preventDefault();
//   //     history.push(`/Conformation/${order.id}`);
//   //   };
//   //need to add functionality and validation

//   //button that dispatches posting order to the order post api route

// // the submit makes a post request to order
// //map dispatch to props the thunk creator to post that order
// const mapStateToProps = (state) => ({
//   //the key is my props and the value is where I am pulling my state from
//   singleUserOrder: state.order, //I need to define this in Redux
// });

// const mapDispatchToProps = (dispatch) => ({
//   userOrder: (orderId) => dispatch(fetchUserOrder(orderId)),
// });

// export default reduxForm({
//   form: 'Checkout',
//   // validate: validateCheckout
// })(Checkout);
// // const mapState = (state) => {
// //   return {
// //     name: state.user.name,
// //     title: state.product.title,
// //     type: state.product.type,
// //     mailing: state.order.mailingAddress,
// //     billing: state.order.billingAddress,
// //     price: state.product.price,
// //   };
// // };

// //add mapState connect
