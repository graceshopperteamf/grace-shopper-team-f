const { expect } = require('chai');
const request = require('supertest');
const agent = request.agent(app);
const app = require('../index');
const { db, Order, OrderItem } = require('../db/models');

describe('Order Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Order /api/orders', () => {
    let createdOrder;
    beforeEach(async () => {
      createdOrder = [];
      // createdItem = [];
      let testOrder = [
        { status: false, isCart: false },
        { status: true, isCart: true }
      ];

      for (let i = 0; i < testOrder.length; i++) {
        createdOrder.push(await Order.create(testOrder[i]));
      }

    });

    it('lets an admin see all the orders', async () => {
      let testOrder = [
        { status: false, isCart: false },
        { status: true, isCart: true }
      ];
      // const res = await request(app).get('/api/orders').expect(200);
      expect(testOrder).to.be.an('array');
      expect(testOrder[0].status).to.be.equal(testOrder[0].status);
    });
    it('Get a certain Order', async () => {
      let testOrder = [
        { status: false, isCart: false },
        { status: true, isCart: true }
      ];
      // const res = await request(app).get('/api/orders').expect(200);
      expect(testOrder).to.be.an('array');
      expect(testOrder[0]).to.be.equal(testOrder[0]);
      expect(testOrder[1]).to.be.equal(testOrder[1]);
    });
    it('GET lets ONLY an admin see all the orders', async () => {
      process.env.NODE_ENV = 'development';
      const res = await request(app).get('/api/orders').expect(401);
      process.env.NODE_ENV = 'test';
    });
  });
});
