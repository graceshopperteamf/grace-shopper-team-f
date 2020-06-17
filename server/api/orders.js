const router = require('express').Router();

const adminMiddleware = require('./adminMiddleware');

const { Order, OrderItem } = require('../db/models');

// get all the orders (only admisn)
router.get('/', adminMiddleware, async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: {
                isCart: {
                    [sequelize.Op.not]: true
                }
            },
            include: [OrderItem]
        });
        res.status(200).json(orders);
    }
    catch (e) { next(e); }
});

/*
    i think it's safe to assume that the only time an order is being posted,
    is when a user checks out
*/
router.post('/', async (req, res, next) => {
    try {

        // first we get the user we're workiing with (from the database so we get magic methods)
        let user = await User.findByPk(req.user.id);

        // if they're checking out, their cart should have all the order items they are buying
        let userCart = await user.getCart();

        // we create a new order object to represent the user's purchase
        let purchaseOrder = await Order.create();

        // set the purchase order's user
        await user.addOrder(purchaseOrder);

        // then we transfer the created order items that belong to the cart,
        // over to the new purchase order
        // this effectively 'clears' the cart (since now it has no order items)
        let orderItems = await userCart.getOrderItems();
        await purchaseOrder.addOrderItems(orderItems);

        // just to check:
        console.log('cart order items after transfer:', (await userCart.getOrderItems()));

        // return the purchase order
        res.status(200).json(purchaseOrder);
    }
    catch (e) { next(e); }
});

// get a certain order
router.get('/:orderId', async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.orderId, { include: [OrderItem] });
        res.status(200).json(order);
    }
    catch (e) { next(e); }
});

module.exports = router;
