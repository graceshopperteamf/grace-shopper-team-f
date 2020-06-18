const { expect } = require('chai');
const request = require('supertest');
const agent = request.agent(app);
const app = require('../index');
const { db, Artist, Product } = require('../db/models');

const artistSeeds = require('../../script/seed-artist');

// describe('Artist routes,', () =>{
//   let storedArtists;

//   const artistData = [
//     {
//       name: 'Artist1'
//     },
//     {
//       name: 'Artist2'
//     }
//   ];

// beforeEach(async () => {
//   const createdArtists = await Artist.bulkCreate(artistData);
//   storedArtists = createdArtists.map(artist => artist.dataValues);
// });
// describe('GET to fetch all Artists', () => {
//   it('servers up all Artists', async () => {
//     const response = await agent
//       .get()
//   })
// })

// })

describe('Artist routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Admin /api/artists/', () => {
    let createdArtist;
    beforeEach(async () => {
      createdArtist = [];
      for (let i = 0; i < artistSeeds.length; i++) {
        createdArtist.push((await Artist.create(artistSeeds[i])));
      }
    });
    it('Get lets an admin see all the artists', async () => {
      const res = await request(app).get('/api/artists').expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.be.equal(artistSeeds[0].name);
      expect(res.body.length).to.be.equal(artistSeeds.length);
    });

    it('GET /:artistId lets an admin see a specific artist', async () => {
      const res = await request(app).get(`/api/artists/${createdArtist[0].id}`).expect(200);
      expect(res.body.name).to.be.equal(createdArtist[0].name);
    });

    it('GET /:artistId lets ONLY an admin see a specific artist', async () => {
      process.env.NODE_ENV = 'development';
      const res = await request(app).put(`/api/artists/${createdArtist[0].id}`).expect(401);
      process.env.NODE_ENV = 'test';
    });

  });
});

describe('/api/artists/', () => {
  let createdArtists;
  let createdProducts;
  beforeEach(async () => {
    createdArtists = [];
    for (let i = 0; i < artistSeeds.length; i++) {
      createdArtists.push((await Artist.create(artistSeeds[i])));
    }
    createdProducts = [];
    for (let i = 0; i < 5; i++) {
      const prod = await Product.create();
      createdProducts.push(prod);
      createdArtists[0].addProduct(prod);
    }
  });

  // it('GET /:artistId/products gets all of a artists producrs,', async () => {
  //   let res = await request(app).post(`/api/artists/${createdArtists[0].id}/products`).expect(200);
  //   expect(res.body).to.be.an('array');
  //   expect(res.body[0].id).to.be.equal(createdProducts[0].id);
  //   expect(res.body.length).to.be.equal(createdProducts.length)

  //   res = await request(app).get(`/api/artists/${createdArtists[1].id}/products`).expect(200);
  //   expect(res.body).to.be.an('array')
  //   expect(res.body).to.deep.equal([]);
  // });
});
