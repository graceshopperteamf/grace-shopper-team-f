/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const { db, User, Order, OrderItem } = require('../db/models');
const { createRandomUser } = require('../../script/seed');

const userSeeds = require('../../script/seedUsers');

describe('User routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });

    describe('ADMIN /api/users/', () => {
        let createdUsers;
        beforeEach(async () => {
            createdUsers = [];
            for (let i = 0; i < userSeeds.length; i++) {
                createdUsers.push((await User.create(userSeeds[i])));
            }
        });

        it('GET lets an admin see all the users', async () => {
            const res = await request(app).get('/api/users').expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0].email).to.be.equal(userSeeds[0].email);
            expect(res.body.length).to.be.equal(userSeeds.length);
        });
        it('GET lets ONLY an admin see all the users', async () => {
            process.env.NODE_ENV = 'development';
            const res = await request(app).get('/api/users').expect(401);
            process.env.NODE_ENV = 'test';
        });


        it('GET /:userId lets an admin see a specific user', async () => {
            const res = await request(app).get(`/api/users/${createdUsers[0].id}`).expect(200);
            expect(res.body.email).to.be.equal(createdUsers[0].email);
        });
        it('GET /:userId lets ONLY an admin see a specific user', async () => {
            process.env.NODE_ENV = 'development';
            const res = await request(app).get(`/api/users/${createdUsers[0].id}`).expect(401);
            process.env.NODE_ENV = 'test';
        });


    });


    describe('/api/users/', () => {
        let createdUsers;
        let createdOrders;
        beforeEach(async () => {
            createdUsers = [];
            for (let i = 0; i < userSeeds.length; i++) {
                createdUsers.push((await User.create(userSeeds[i])));
            }

            createdOrders = [];
            for (let i = 0; i < 3; i++) {
                const o = await Order.create();
                createdOrders.push(o);
                createdUsers[0].addOrder(o);
            }
        });

        it('GET /:userId/orders gets all of a users orders', async () => {

            let res = await request(app).get(`/api/users/${createdUsers[0].id}/orders`).expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0].id).to.be.equal(createdOrders[0].id);
            expect(res.body.length).to.be.equal(createdOrders.length);

            res = await request(app).get(`/api/users/${createdUsers[1].id}/orders`).expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.deep.equal([]);
        });
    });


});
