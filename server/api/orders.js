const router = require('express').Router();

const adminMiddleware = require('./adminMiddleware');

const { Order, OrderItem, User, Product } = require('../db/models');

// get all the orders (only admins)
router.get('/', adminMiddleware, async (req, res, next) => {
    try {
        const orders = await Order.findAll({ include: User });
        res.status(200).json(orders);
    }
    catch (e) { next(e); }
});

/*
    order is posted anytime a user checks out.

    req.body should be an array of objects where each object is:

    {
        quantity: 3,
        productId: 0
    }
*/

router.post('/', async (req, res, next) => {
    try {
        const quantityKey = 'quantity';
        const productKey = 'productId';

        // validate our request body
        // is it an array?
        if (!Array.isArray(req.body))
            throw new Error(`POST api/orders: request body should be an array, got type: ${typeof req.body}`);

        // is it empty?
        if (req.body.length <= 0)
            throw new Error(`POST api/orders: cannot post an empty order array`);

        // does each element have the appropriate keys?
        for (let i = 0; i < req.body.length; i++) {
            const checkKey = (k) => {
                if (!(k in req.body[i]))
                    throw new Error(`POST api/orders: order item at index ${i} missing key: '${k}'`);
            };
            checkKey(quantityKey);
            checkKey(productKey);
        }

        let userId = null;
        if (process.env.NODE_ENV !== 'test')
            userId = req.user.id;

        // create an order that belongs to the user
        let purchaseOrder = await Order.create({ userId });

        // create the order items and add
        for (let i = 0; i < req.body.length; i++) {
            await purchaseOrder.createOrderItem({
                quantity: req.body[i][quantityKey],
                productId: req.body[i][productKey]
            });
        }

        // return the purchase order
        res.status(200).json(purchaseOrder);
    }
    catch (e) { next(e); }
});

// get a certain order
router.get('/:orderId', async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.orderId, {
            include: {
                model: OrderItem,
                include: {
                    model: Product
                }
            }
        });
        res.status(200).json(order);
    }
    catch (e) { next(e); }
});

module.exports = router;
