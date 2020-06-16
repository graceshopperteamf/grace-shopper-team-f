const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  // orderId: {
  //   type: Sequelize.INT,
  // },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  totalQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Order;
