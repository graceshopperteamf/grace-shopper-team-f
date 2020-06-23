import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
class CheckoutForm extends Component {
  //handleSubmit will send order to Stripe? and order id to confirmation page

  //   handleSubmit = async (event) => {
  //     event.preventDefault();
  //     history.push(`/Conformation/${order.id}`);
  //   };
  //need to add functionality and validation

  render() {
    //const { pristine, reset, submitting } = this.props;
    return (
      <div>
        <hr />
        <form>
          <h2>Shipping Information</h2>
          <Field label="First name" name="firstName" type="text" />
          <Field label="Last name" name="lastName" type="text" />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="email@example.com"
          />
          <Field label="Phone" name="phone" type="text" />
          <Field
            label="Street address"
            name="street1"
            type="text"
            placeholder="Street and number, P.O. box, etc."
          />
          <Field
            label="Unit number"
            name="street2"
            type="text"
            placeholder="Apartment, suite, building, etc."
          />
          <Field label="City" name="city" type="text" />
          <Field label="State" name="state" type="text" />
          <Field label="Zip" name="zip" type="text" />

          {/* <div>
            <button
              type="submit"
              disabled={submitting}
              onClick={(event) => this.handleSubmit(event)}
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
          </div> */}
        </form>
      </div>
    );
  }
}

export default connect(CheckoutForm);
