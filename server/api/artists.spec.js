const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const { db, Artist, Product } = require('../db/models');
const { createRandomProductTemplate, createRandomProduct } = require('../../script/seed');

const { testForAdminOnlyPost, testForAdminOnlyPut, testForAdminOnlyDelete } = require('./adminTestingUtils');

describe('Artist routes', () => {
    let artistAlreadyThere;
    beforeEach(async () => {
        await db.sync({ force: true });
        artistAlreadyThere = await Artist.create({ name: 'artist already there' });
    });

    describe('ADMIN /api/artists/', () => {
        it('POST Lets an admin add an artist', async () => {
            let res = await request(app).post('/api/artists').send({name: 'a new posted artist'})
.expect(200);
            expect(res.body.name).to.be.equal('a new posted artist');
            let artists = await Artist.findAll();
            expect(artists.length).to.be.equal(2);
        });

        it('POST Lets ONLY an admin add an artist', testForAdminOnlyPost(`/api/artists`));


        it('POST /:artistId/products Lets an admin add a product to an artist', async () => {
            const randProd = createRandomProductTemplate('newtitle');
            let res = await request(app).post(`/api/artists/${artistAlreadyThere.id}/products`).send(randProd)
.expect(200);
            expect(res.body.title).to.be.equal(randProd.title);
            let products = await artistAlreadyThere.getProducts();
            expect(products[0].title).to.be.equal(randProd.title);
        });

        it('POST /:artistId/products Lets ONLY an admin add a product to an artist', testForAdminOnlyPost(`/api/artists/1/products`));


        it('PUT /:artistId Lets an admin edit an artist in the DB', async () => {
            let res = await request(app).put(`/api/artists/${artistAlreadyThere.id}`).send({name: 'an updated name'})
.expect(200);
            expect(res.body.id).to.be.equal(artistAlreadyThere.id);
            artistAlreadyThere = await Artist.findByPk(res.body.id);
            expect(artistAlreadyThere.name).to.be.equal('an updated name');
        });

        it('PUT /:artistId Lets ONLY an admin edit an artist in the DB', testForAdminOnlyPut(`/api/artists/1`));

        it('DELETE /:artistId Lets an admin edit an artist in the DB', async () => {
            await request(app).delete(`/api/artists/${artistAlreadyThere.id}`).expect(204);
            let artists = await Artist.findAll();
            expect(artists.length).to.be.equal(0);
        });

        it('DELETE /:artistId Lets ONLY an admin edit an artist in the DB', testForAdminOnlyDelete(`/api/artists/1`));

    });
    describe('/api/artists/', () => {
        it('GET returns an array with all the artists in the DB', async () => {
            const res = await request(app).get('/api/artists').expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(1);
        });

        it('GET /:artistId returns a specified artist', async () => {
            const res = await request(app).get(`/api/artists/${artistAlreadyThere.id}`).expect(200);
            expect(res.body.id).to.be.equal(artistAlreadyThere.id);
            expect(res.body.name).to.be.equal(artistAlreadyThere.name);

        });
        it('GET /:artistId/products returns an array of all the products the artists owns', async () => {
            let res = await request(app).get(`/api/artists/${artistAlreadyThere.id}/products`).expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(0);

            const prod = await createRandomProduct('artProd');
            await artistAlreadyThere.addProduct(prod);

            res = await request(app).get(`/api/artists/${artistAlreadyThere.id}/products`).expect(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(1);
            expect(res.body[0].title).to.be.equal('artProd');
        });
    });
});
