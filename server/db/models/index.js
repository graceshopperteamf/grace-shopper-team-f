const db = require('../db');
const User = require('./user');

const { Product, productTypes, productKeys } = require('./product');
const Artist = require('./artist');

const Order = require('./order');
const OrderItem = require('./orderItem');
const Cart = require('./cart');

//Associations

Order.hasMany(OrderItem);
OrderItem.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

Artist.hasMany(Product);
Product.belongsTo(Artist);

Cart.belongsTo(User);
User.hasOne(Cart);
Cart.hasMany(OrderItem);
OrderItem.belongsTo(Cart);

module.exports = {
  db,
  productTypes,
  productKeys,
  Product,
  Artist,
  User,
  Order,
  OrderItem,
  Cart
};
