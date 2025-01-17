const { Router } = require('express');

const usersRoutes = require('./users.routes');
const dishesRoutes = require('./dishes.routes');
const ordersRoutes = require('./orders.routes');
const sessionsRoutes = require('./sessions.routes');
const paymentsRoutes = require('./payments.routes');
const favoritesRoutes = require('./favorites.routes');
const orderItensRoutes = require('./orderItens.routes');

const router = Router();

router.use('/users', usersRoutes);
router.use('/dishes', dishesRoutes);
router.use('/orders', ordersRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/payments', paymentsRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/orders/itens', orderItensRoutes);

module.exports = router;
