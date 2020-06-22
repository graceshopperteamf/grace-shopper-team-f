const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const { db, Artist, Product } = require('../db/models');
const { createRandomProduct } = require('../../script/seed');


/*
    need to check that during non testing environments, only admins can use
    certain api endpoints. but we also need to suppress the error log so it
    doesnt clutter up our console during tests
*/

const _testForAdminOnly = (callback) => {
    return async () => {
        process.env.NODE_ENV = 'development';
        let oldLogError = console.error;
        console.error = function() {};
        await callback();
        console.error = oldLogError;
        process.env.NODE_ENV = 'test';
    };
};
const testForAdminOnlyGet = (endpoint) => {
    return _testForAdminOnly(() => { return request(app).get(endpoint).expect(401); });
};
const testForAdminOnlyPut = (endpoint) => {
    return _testForAdminOnly(() => { return request(app).put(endpoint).expect(401); });
};
const testForAdminOnlyDelete = (endpoint) => {
    return _testForAdminOnly(() => { return request(app).delete(endpoint).expect(401); });
};
const testForAdminOnlyPost = (endpoint) => {
    return _testForAdminOnly(() => { return request(app).post(endpoint).expect(401); });
};


/**
 *
 *
 *
router.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.findAll({ include: [Product] });
        res.status(200).json(artists);
    }
    catch (e) { next(e); }
});

router.post('/', adminMiddleware, async (req, res, next) => {
    try {

        // build the artist template with keys from the req.body if they're supplied
        const nameKey = 'name';
        const artist = {};
        if (nameKey in req.body) artist[nameKey] = req.body[nameKey];

        let newArtist = await Artist.create(artist);
        newArtist.products = [];
        res.status(200).json( newArtist );
    }
    catch (e) { next(e); }
});

router.get('/:artistId', async (req, res, next) => {
    try {
        const artist = await Artist.findByPk(req.params.artistId, { include: [Product] });
        res.status(200).json(artist);
    }
    catch (e) { next(e); }
});

router.get('/:artistId/products', async (req, res, next) => {
    try {
        const artist = await Artist.findByPk(req.params.artistId, { include: [Product] });
        res.status(200).json(artist.products);
    }
    catch (e) { next(e); }
});

router.post('/:artistId/products', adminMiddleware, async (req, res, next) => {
    try {

        // build the product template with keys from the req.body if they're supplied
        const titleKey = 'title';
        const priceKey = 'price';
        const imageKey = 'image';
        const typeKey = 'type';

        const prod = {};
        if (titleKey in req.body) prod[titleKey] = req.body[titleKey];
        if (priceKey in req.body) prod[priceKey] = req.body[priceKey];
        if (imageKey in req.body) prod[imageKey] = req.body[imageKey];
        if (typeKey in req.body) prod[typeKey] = req.body[typeKey];

        // add the new product to the specified artist
        let artist = await Artist.findByPk(req.params.artistId);

        // create the new product in the database
        let newProduct = await artist.createProduct(prod);

        // reload with associations
        newProduct = await Product.findByPk(newProduct.id, { include: [Artist] });
        res.status(200).json( newProduct );
    }
    catch (e) { next(e); }
});


router.delete('/:artistId', adminMiddleware, async (req, res, next) => {
    try {
        await Artist.destroy( { where: { id: req.params.artistId } });
        res.status(204).end();
    }
    catch (e) { next(e); }
});

router.put('/:artistId', adminMiddleware, async (req, res, next) => {
    try {
        let artist = await Artist.findByPk(req.params.artistId, { include: [Product] });

        // build the artist template with keys from the req.body if they're supplied
        const nameKey = 'name';
        const artistUpdated = {};
        if (nameKey in req.body) artistUpdated[nameKey] = req.body[nameKey];

        artist = await artist.update(artistUpdated);
        res.status(200).json(artist);
    }
    catch (e) { next(e); }
});

 */

describe('Artist routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });

    describe('ADMIN /api/artists/', () => {
        it('POST Lets an admin add an artist', async () => {

        });

        it('POST Lets ONLY an admin add an artist', testForAdminOnlyPost(`/api/artists`));


        it('POST /:artistId/products Lets an admin add a product to an artist', async () => {

        });

        it('POST /:artistId/products Lets ONLY an admin add a product to an artist', testForAdminOnlyPost(`/api/artists/${createdArtists[0].id}`));


        it('PUT /:artistId Lets an admin edit an artist in the DB', async () => {

        });

        it('PUT /:artistId Lets ONLY an admin edit an artist in the DB', testForAdminOnlyPut(`/api/artists/${createdArtists[0].id}`));

        it('DELETE /:artistId Lets an admin edit an artist in the DB', async () => {

        });

        it('DELETE /:artistId Lets ONLY an admin edit an artist in the DB', testForAdminOnlyDelete(`/api/artists/${createdArtists[0].id}`));

    });
    describe('/api/artists/', () => {
        it('GET returns an array with all the artists in the DB', async () => {

        });
        it('GET /:artistId returns a specified artist', async () => {

        });
        it('GET /:artistId/products returns an array of all the products the artists owns', async () => {

        });
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
