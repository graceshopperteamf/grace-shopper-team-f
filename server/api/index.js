const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/orderItems', require('./orderItems'));
router.use('/orders', require('./orders'));
router.use('/artists', require('./artists'));
router.use('/products', require('./products'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
