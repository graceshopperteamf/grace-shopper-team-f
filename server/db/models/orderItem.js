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
        validate: {
            min: 0,
        },
    }
});

const onCreate = async (orderItem) => {
    const prod = await orderItem.getProduct();
    orderItem.price = prod.price;
};

OrderItem.beforeCreate(onCreate);
OrderItem.beforeBulkCreate((orderItems) => {
    orderItems.forEach(onCreate);
});

module.exports = OrderItem;
