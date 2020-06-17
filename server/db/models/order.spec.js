const chai = require('chai');
const expect = chai.expect;
const db = require('../db');
const Order = require('./order.js');
const OrderItem = require('./orderItem');

describe('Order Validation', () => {
  it('contains status', async () => {
    const newOrder = await Order.create({
      status: false,
      isCart: false,
    });
    expect(newOrder.status).to.equal(false);
    expect(newOrder.isCart).to.equal(false);
  });

  it('requires boolean,', async () => {
    const newOrder = await Order.create({
      status: true,
    });
    expect(newOrder.status).to.be.a('boolean');
  });
});
//Order Item
describe('Order Item Validation', () => {
  it('contains quantity', async () => {
    const newOrder = await OrderItem.create({
      quantity: 2,
    });
    expect(newOrder.quantity).to.equal(2);
  });

  it('requires an number,', async () => {
    const newOrder = await OrderItem.create({
      quantity: 1,
    });
    expect(newOrder.quantity).to.be.a('number');
  });
});
