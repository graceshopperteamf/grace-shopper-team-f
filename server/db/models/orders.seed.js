const Order = require('./order');
const OrderItem = require('./orderItem');
const db = require('../db');

const orders = [
  {
    status: false,
    totalPrice: 250,
    totalQuantity: 1
  },
  {
    status: true,
    totalPrice: 1000,
    totalQuantity: 2
  },
  {
    status: false,
    totalPrice: 500,
    totalQuantity: 1
  },
  {
    status: true,
    totalPrice: 2500,
    totalQuantity: 3
  },
  {
    status: false,
    totalPrice: 400,
    totalQuantity: 4
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
