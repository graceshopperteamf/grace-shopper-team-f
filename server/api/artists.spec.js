const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const { db, Artist, Product } = require('../db/models');
const { createRandomProduct } = require('../../script/seed');

describe('Artist routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Admin /api/artists/', () => {
    let createdArtist;
    beforeEach(async () => {
      createdArtist = [];
      let testArtist = [{ name: 'Grace' },
      { name: 'Jon' },
      { name: 'Fugee' }];

      for (let i = 0; i < testArtist.length; i++) {
        createdArtist.push((await Artist.create(testArtist[i])));
      }


    });
    it('Get lets an admin see all the artists', async () => {
      let testArtist = [{ name: 'Grace' },
      { name: 'Jon' },
      { name: 'Fugee' }];
      const res = await request(app).get('/api/artists').expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.be.equal(testArtist[0].name);
      // expect(res.body.length).to.be.equal(testArtist.length);
    });


    it('GET /:artistId lets  an admin see a specific artist', async () => {
      process.env.NODE_ENV = 'development';
      const res = await request(app).get(`/api/artists/${createdArtist[0].id}`).expect(200);
      process.env.NODE_ENV = 'test';
    });

  });


  describe('/api/artists/', () => {
    // beforeEach(() => {
    //   return db.sync({ force: true });
    // });

    let createdArtists;
    let createdProducts;
    beforeEach(async () => {
      createdArtists = [];
      let testArtist = [{ name: 'Grace' },
      { name: 'Jon' },
      { name: 'Fugee' }];

      for (let i = 0; i < testArtist.length; i++) {
        createdArtists.push((await Artist.create(testArtist[i])));
      }
      createdProducts = [];
      for (let i = 0; i < 4; i++) {
        let title = 'shopper';
        const product = await createRandomProduct(title);
        createdProducts.push(product);
        createdArtists[0].addProduct(product);

      }
    });

    it('GET /:artistId/products gets all of a artists producrs,', async () => {
      let res = await request(app).get(`/api/artists/${createdArtists[0].id}/products`).expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].id).to.be.equal(createdProducts[0].id);
      expect(res.body.length).to.be.equal(createdProducts.length);

      res = await request(app).get(`/api/artists/${createdArtists[1].id}/products`).expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.deep.equal([]);
    });
  });
});
