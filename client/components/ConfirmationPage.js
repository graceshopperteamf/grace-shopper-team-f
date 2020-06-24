import React from 'react';
import { connect } from 'react-redux';

const ConfirmationPage = (props) => {
  let today = new Date();
  const { name, title, price, mailing, billing } = props;
  return (
    <div>
      <div>
        <h1>THANK YOU FOR YOUR ORDER {name}!</h1>
        <p>We’ll send a confirmation email once your order has shipped</p>
      </div>
      <div>
        <p>Order Date: {today.getDate}</p>
        <p>Delivery Details: {billing}</p>
        <p>Delivery Details: {mailing}</p>
        <div>
          <p>Order Summary: </p>
          <p>Title: {title}</p>
          <p>Price: {price} </p>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    name: state.user.name,
    title: state.product.title,
    type: state.product.type,
    mailing: state.order.mailingAddress,
    billing: state.order.billingAddress,
    price: state.product.price,
  };
};

export default connect(mapState)(ConfirmationPage);
