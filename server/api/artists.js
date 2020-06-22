const router = require('express').Router();

const adminMiddleware = require('./adminMiddleware');

const { Artist, Product, productKeys } = require('../db/models');

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
        const prod = {};
        productKeys.forEach(k => {
            if (k in req.body) prod[k] = req.body[k];
        });

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


module.exports = router;
