/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const { db, Product } = require('../db/models');
const { createRandomProduct } = require('../../script/seed');
const { testForAdminOnlyPut, testForAdminOnlyDelete } = require('./adminTestingUtils');

describe('Product routes', () => {
    let productAlreadyThere;
    beforeEach(async () => {
        await db.sync({ force: true });
        productAlreadyThere = await createRandomProduct('already there');
    });

    describe('ADMIN /api/products/', () => {

        it('PUT /:productId Lets an admin edit product in the DB', async () => {
            let res = await request(app).put(`/api/products/${productAlreadyThere.id}`).send({name: 'an updated name'})
.expect(200);
            expect(res.body.id).to.be.equal(productAlreadyThere.id);
            productAlreadyThere = await Product.findByPk(res.body.id);
            expect(productAlreadyThere.name).to.be.equal('an updated name');
        });

        it('PUT /:productId Lets ONLY an admin edit a product in the DB', testForAdminOnlyPut(`/api/products/1`));

        it('DELETE /:productId Lets an admin delete a product in the DB', async () => {
            await request(app).delete(`/api/products/${productAlreadyThere.id}`).expect(204);
            let prods = await Product.findAll();
            expect(prods.length).to.be.equal(0);
        });

        it('DELETE /:productId Lets ONLY an admin delete a product in the DB', testForAdminOnlyDelete(`/api/products/1`));

    });
    describe('/api/products/', () => {
        it('GET returns an array with all the products in the DB', async () => {
            const res = await request(app).get('/api/products').expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(1);
        });

        it('GET /:productId returns a specified product', async () => {
            const res = await request(app).get(`/api/products/${productAlreadyThere.id}`).expect(200);
            expect(res.body.id).to.be.equal(productAlreadyThere.id);
            expect(res.body.name).to.be.equal(productAlreadyThere.name);
        });
    });
});
