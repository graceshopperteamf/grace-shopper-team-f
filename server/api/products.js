const router = require('express').Router();

const adminMiddleware = require('./adminMiddleware');

const { Artist, Product } = require('../db/models');

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.findAll({ include: [Artist] });
        res.status(200).json(products);
    }
    catch (e) { next(e); }
});

router.post('/:artistId', adminMiddleware, async (req, res, next) => {
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

router.get('/:productId', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId, { include: [Artist] });
        res.status(200).json(product);
    }
    catch (e) { next(e); }
});

router.delete('/:productId', adminMiddleware, async (req, res, next) => {
    try {
        await Product.destroy( { where: { id: req.params.productId } });
        res.status(204).end();
    }
    catch (e) { next(e); }
});

router.put('/:productId', adminMiddleware, async (req, res, next) => {
    try {
        let product = await Product.findByPk(req.params.productId, { include: [Artist] });
        product = await product.update(req.body);
        res.status(200).json(product);
    }
    catch (e) { next(e); }
});


module.exports = router;
