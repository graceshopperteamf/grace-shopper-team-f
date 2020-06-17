const router = require('express').Router();
const adminMiddleware = require('./adminMiddleware');

const {User, Order} = require('../db/models');
module.exports = router;

router.get('/', adminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});


router.get('/:userId', adminMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, { attributes: ['id', 'email'] });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// get all the orders for the user
router.get('/:userId/orders', async (req, res, next) => {
  try {
      const user = await User.findByPk(req.params.userId, { include: [Order] });
      const orders = await user.getOrders();
      res.status(200).json(orders);
  }
  catch (e) { next(e); }
});

