const Sequelize = require('sequelize');
const db = require('../db');

const productTypes = ['Unique Artwork', 'Print - Limited Edition', 'Print'];
const productKeys = [ 'title', 'price', 'image', 'type', 'description' ];

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
        defaultValue: 'default-image.png',
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Print',
        validate: {
            notEmpty: true,
            isIn: [productTypes],
        },
    },
    inventoryQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: Infinity
        }
    },
    description: {
        type: Sequelize.STRING
    }
});

module.exports = { Product, productTypes, productKeys };
