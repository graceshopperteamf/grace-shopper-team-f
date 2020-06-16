const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  // orderId: {
  //   type: Sequelize.INT,
  // },
  //min max no negative
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
      max: Infinity
    }
  },
  totalQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
      max: 25
    }
  }
});

module.exports = Order;
