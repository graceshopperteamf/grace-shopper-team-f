const router = require('express').Router();

const { OrderItem, Product } = require('../db/models');

/*
    any direct order item actions are probably only going to happen
    when a user is adding, editing, or deleteing from their cart...
*/

const getCurrentUserCart = async (req) => {
    let user = await User.findByPk(req.user.id);
    let userCart = await user.getCart();
    return userCart;
};

/*
    add new order item to cart
    (is it weird to have a route with a paramId from another model???)
*/
router.post('/:productId', async (req, res, next) => {
    try {
        let userCart = await getCurrentUserCart(req);
        let product = await Product.findByPk(req.params.productId);
        let orderItem = await OrderItem.create();
        await orderItem.setProduct(product);
        await userCart.addOrderItem(orderItem);

        res.status(200).json( orderItem );
    }
    catch (e) { next(e); }
});

/*
    delete order item
*/
router.delete('/:orderItemId', async (req, res, next) => {
    try {
        await OrderItem.destroy( { where: { id: req.params.orderItemId } });
        res.status(204).end();
    }
    catch (e) { next(e); }
});

/*
    edit an order item
*/
router.put('/:orderItemId', async (req, res, next) => {
    try {
        let orderItem = await OrderItem.findByPk(req.params.orderItemId, { include: [Product] });
        orderItem = await orderItem.update(req.body);
        res.status(200).json(orderItem);
    }
    catch (e) { next(e); }
});


module.exports = router;
