const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 0,
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    }
});

module.exports = OrderItem;
