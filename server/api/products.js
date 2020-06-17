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
