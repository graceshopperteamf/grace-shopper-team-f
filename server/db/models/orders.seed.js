const Order = require('./order');
const OrderItem = require('./orderItem');
const db = require('../db');

const orders = [
  {
    status: false,
    isCart: false

  },
  {
    status: true,
    isCart: false
  },
  {
    status: false,
    isCart: false
  },
  {
    status: true,
    isCart: false
  },
  {
    status: false,
    isCart: false
  }
];

const orderItems = [
  {
    quantity: 1
  },
  {
    quantity: 2
  },
  {
    quantity: 3
  },
  {
    quantity: 4
  },
  {
    quantity: 5
  }

];

module.exports = { orders, orderItems };
