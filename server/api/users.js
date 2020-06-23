const router = require('express').Router();
const adminMiddleware = require('./adminMiddleware');

const {User, Order} = require('../db/models');
module.exports = router;

router.get('/', adminMiddleware, async (req, res, next) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'email'] });
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});

router.get('/:userId', adminMiddleware, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId, { attributes: ['id', 'email'] });
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});

// get all the orders for the user
router.get('/:userId/orders', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            include: {
                model: Order,
                include: {
                    model: User
                }
            }
        });
        res.status(200).json(user.orders);
    }
    catch (e) { next(e); }
});

