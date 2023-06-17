const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

router.use('/', require('./auth'));
router.use('/users', require('../middlewares/auth'), require('./users'));
router.use('/movies', require('../middlewares/auth'), require('./movies'));

router.use('*', (req, res, next) => next(new NotFoundError('Маршрут не найден')));

module.exports = router;
