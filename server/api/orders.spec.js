const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const { db, Order } = require('../db/models');

const { createRandomProducts, createRandomOrder } = require('../../script/seed');
const { testForAdminOnlyGet } = require('./adminTestingUtils');
const OrderItem = require('../db/models/orderItem');

describe('Order Routes', () => {
    beforeEach(async () => {
        await db.sync({ force: true });
        await createRandomOrder();
    });


    describe('ADMIN /api/orders/', () => {
        it('GET lets an admin see all the orders', async () => {
            const res = await request(app).get('/api/orders').expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(1);
        });

        it('GET lets ONLY an admin see all the orders', testForAdminOnlyGet('/api/orders'));
    });
    describe('/api/orders/', () => {

        it('GET /:orderId returns a specified order', async () => {
            const res = await request(app).get(`/api/orders/1`).expect(200);
            expect(res.body.id).to.be.equal(1);
        });

        it('POST adds an order', async () => {

            await createRandomProducts(2);
            const createdOrder = [
                {
                    quantity: 3,
                    productId: 1
                },
                {
                    quantity: 3,
                    productId: 2
                },
            ];
            let res = await request(app).post('/api/orders').send(createdOrder)
.expect(200);
            let orders = await Order.findAll();
            expect(orders.length).to.be.equal(2);

            let order = await Order.findByPk(res.body.id, { include: [OrderItem] });
            expect(order.orderItems.length).to.be.equal(createdOrder.length);
        });
    });
});
