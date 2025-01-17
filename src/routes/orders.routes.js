const { Router } = require('express');
const OrdersController = require('../controller/orders.Controller');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post(
    '/',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    ordersController.create
);
ordersRouter.get(
    '/',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    ordersController.index
);
ordersRouter.delete(
    '/:id',
    ensureAuthenticated,
    verifyUserAuthorization(['admin']),
    ordersController.delete
);
ordersRouter.put(
    '/',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    ordersController.update
);

module.exports = ordersRouter;
