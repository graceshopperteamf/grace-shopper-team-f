const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'default-image.png',
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Print',
        validate: {
            notEmpty: true,
            isIn: [['Unique Artwork', 'Print - Limited Edition', 'Print']],
        },
    },
});

module.exports = Product;
