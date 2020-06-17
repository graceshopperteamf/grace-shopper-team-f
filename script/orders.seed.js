const Order = require('../server/db/models/order');

const db = require('../server/db/db');

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

module.exports = orders;

