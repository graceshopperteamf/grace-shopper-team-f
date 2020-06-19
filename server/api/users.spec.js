/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const { db, Order } = require('../db/models');
const { createRandomUsers } = require('../../script/seed');

describe('User routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });

    describe('ADMIN /api/users/', () => {
        let createdUsers;
        beforeEach(async () => {
            createdUsers = await createRandomUsers(5);
        });

        /*
            need to run some tests in a non testing node environemnt, to check for certain
            error responses that we're expecting, so we change the node env to development, and suppress
            those error logs as to not display in console
        */
        const runInSimulatedNonTestingEnvironment = async (callback) => {
            process.env.NODE_ENV = 'development';
            let oldLogError = console.error;
            console.error = function() {};
            await callback();
            console.error = oldLogError;
            process.env.NODE_ENV = 'test';
        };

        it('GET lets an admin see all the users', async () => {
            const res = await request(app).get('/api/users').expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(createdUsers.length);
        });
        it('GET lets ONLY an admin see all the users', async () => {
            await runInSimulatedNonTestingEnvironment(() => {
                return request(app).get('/api/users').expect(401);
            });
        });

        it('GET /:userId lets an admin see a specific user', async () => {
            const res = await request(app).get(`/api/users/${createdUsers[0].id}`).expect(200);
            expect(res.body.email).to.be.equal(createdUsers[0].email);
        });
        it('GET /:userId lets ONLY an admin see a specific user', async () => {
            await runInSimulatedNonTestingEnvironment(() => {
                return request(app).get(`/api/users/${createdUsers[0].id}`).expect(401);
            });
        });
    });


    describe('/api/users/', () => {
        let createdUsers;
        let createdOrders;
        beforeEach(async () => {

            createdUsers = await createRandomUsers(2);

            createdOrders = [];
            for (let i = 0; i < 3; i++) {
                createdOrders.push((await Order.create({ userId: createdUsers[0].id })));
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
