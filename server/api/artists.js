const router = require('express').Router();

const adminMiddleware = require('./adminMiddleware');

const { Artist, Product } = require('../db/models');

router.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.findAll({ include: [Product] });
        res.status(200).json(artists);
    }
    catch (e) { next(e); }
});

router.post('/', adminMiddleware, async (req, res, next) => {
    try {
        let newArtist = await Artist.create(req.body);
        // cant eager load associations on create i guess?
        // need the associations on the object for filters... so i need to
        // re-obtain the obejct with the associations list
        newArtist = await Artist.findByPk(newArtist.id, { include: [Product] });
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
        const products = await artist.getProducts();
        res.status(200).json(products);
    }
    catch (e) { next(e); }
});

router.post('/:artistId/products', adminMiddleware, async (req, res, next) => {
    try {
        let newProduct = await Product.create(req.body);

        // add the new product to the specified artist
        let artist = await Artist.findByPk(req.params.artistId);
        await artist.addProduct(newProduct);

        // cant eager load associations on create i guess?
        // need the associations on the object for filters... so i need to
        // re-obtain the obejct with the associations list
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
        artist = await artist.update(req.body);
        res.status(200).json(artist);
    }
    catch (e) { next(e); }
});


module.exports = router;
