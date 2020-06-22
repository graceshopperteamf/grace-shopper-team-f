/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const { db, Order } = require('../db/models');
const { createRandomUsers } = require('../../script/seed');

/*
    need to check that during non testing environments, only admins can use
    certain api endpoints. but we also need to suppress the error log so it
    doesnt clutter up our console during tests
*/
const testForAdminOnly = (endpoint) => {
    return async () => {
        process.env.NODE_ENV = 'development';

        let oldLogError = console.error;
        console.error = function() {};

        await request(app).get(endpoint).expect(401);

        console.error = oldLogError;
        process.env.NODE_ENV = 'test';
    };
};

describe('User routes', () => {
    let users;
    beforeEach(async () => {
        await db.sync({ force: true });
        users = await createRandomUsers(5);
    });

    describe('ADMIN /api/users/', () => {

        it('GET lets an admin see all the users', async () => {
            const res = await request(app).get('/api/users').expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(users.length);
        });
        it('GET /:userId lets an admin see a specific user', async () => {
            const res = await request(app).get(`/api/users/${users[0].id}`).expect(200);
            expect(res.body.email).to.be.equal(users[0].email);
        });

        it('GET lets ONLY an admin see all the users', testForAdminOnly('/api/users'));
        it('GET /:userId lets ONLY an admin see a specific user', testForAdminOnly(`/api/users/1`));
    });

    describe('/api/users/', () => {

        it('GET /:userId/orders gets all of a users orders', async () => {
            const orders = await Order.bulkCreate( (new Array(3)).fill(0).map(e => { return { userId: users[0].id }; } ) );

            let res = await request(app).get(`/api/users/${users[0].id}/orders`).expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0].id).to.be.equal(orders[0].id);
            expect(res.body.length).to.be.equal(orders.length);

            res = await request(app).get(`/api/users/${users[1].id}/orders`).expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.deep.equal([]);
        });
    });
});
