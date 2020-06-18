const db = require('../db');
const User = require('./user');

const Product = require('./product');
const Artist = require('./artist');

const Order = require('./order');
const OrderItem = require('./orderItem');

//Associations

Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);

User.hasMany(Order);
User.hasOne(Order, { as: 'cart' });

Artist.hasMany(Product);
Product.belongsTo(Artist);

module.exports = {
  db,
  User,
  Product,
  Artist,
  Order,
  OrderItem,
};
