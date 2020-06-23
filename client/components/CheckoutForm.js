import React from 'react';
import { connect } from 'react-redux';
import { Field, Form } from 'redux-form';
class Checkout extends React.Component {

  //Get user Cart?/
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
        <Form>
          <h2>Shipping Information</h2>
          <Field
            label="First name"
            name="firstName"
            component="input"
            type="text"
          />
          <Field
            label="Last name"
            name="lastName"
            component="input"
            type="text"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="email@example.com"
          />
          <Field label="Phone" name="phone" component="input" type="text" />
          <Field
            label="Street address"
            name="street1"
            component="input"
            type="text"
            placeholder="Street and number, P.O. box, etc."
          />
          <Field
            label="Unit number"
            name="street2"
            component="input"
            type="text"
            placeholder="Apartment, suite, building, etc."
          />
          <Field label="City" name="city" component="input" type="text" />
          <Field label="State" name="state" component="input" type="text" />
          <Field label="Zip" name="zip" component="input" type="text" />

          <h2>Shipping Information</h2>
          <Field
            label="First name"
            name="firstName"
            component="input"
            type="text"
          />
          <Field
            label="Last name"
            name="lastName"
            component="input"
            type="text"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="email@example.com"
          />
          <Field label="Phone" name="phone" component="input" type="text" />
          <Field
            label="Street address"
            name="street1"
            component="input"
            type="text"
            placeholder="Street and number, P.O. box, etc."
          />
          <Field
            label="Unit number"
            name="street2"
            component="input"
            type="text"
            placeholder="Apartment, suite, building, etc."
          />
          <Field label="City" name="city" component="input" type="text" />
          <Field label="State" name="state" component="input" type="text" />
          <Field label="Zip" name="zip" component="input" type="text" />

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
        </Form>
      </div>
    );
  }
}

export default connect(Checkout);
