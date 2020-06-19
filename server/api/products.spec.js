/* eslint-disable max-nested-callbacks */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const { db, Product } = require('../db/models');
const { createRandomProduct } = require('../../script/seed');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  describe('Product /api/products', () => {
    let createdProduct;
    beforeEach(async () => {
      createdProduct = [];

      let testProduct = [
        { title: 'Grace', price: 1 }, { title: 'Shopper', price: 1 }, { title: 'FSA', price: 1 }
      ];

      for (let i = 0; i < testProduct.length; ++i) {
        createdProduct.push(await Product.create(testProduct[i]));

      }

    });
    it('finds a certain product', async () => {
      let testProduct = [
        { title: 'Grace', price: 1 }, { title: 'Shopper', price: 1 }, { title: 'FSA', price: 1 }
      ];
      expect(testProduct).to.be.an('array');
      expect(testProduct[0]).to.be.equal(testProduct[0]);
      expect(testProduct[1]).to.be.equal(testProduct[1]);
      expect(testProduct[0]).to.not.be.equal(testProduct[1]);
    });

    describe('/api/products', () => {
      describe('GET /api/products', () => {
        let testProduct = [
          { title: 'Grace', price: 1 }, { title: 'Shopper', price: 1 }, { title: 'FSA', price: 1 }
        ];
        it('sends all products', () => {
          request(app)
            .get('/api/products')
            .expect(200)
            .then((res) => {
              expect(res.body).to.be.an('array');
              expect(res.body.some(product => testProduct[0].title === 'Cody')).to.equal(true);
              expect(res.body.some(product => testProduct[1].title === 'Doug')).to.equal(true);
              expect(res.body.some(product => testProduct[2].title === 'Penny')).to.equal(true);
            });
        });
        it('sends a 404 if not found', () => {

          return request(app)
            .get(`/api/pugs/20`)
            .expect(404);
        });

      });
    });

  });
});
