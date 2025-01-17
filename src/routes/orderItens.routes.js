const { Router } = require('express');
const OrderItensController = require('../controller/orderItens.Controller');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const orderItensRouter = Router();
const orderItensController = new OrderItensController();

orderItensRouter.post(
    '/',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    orderItensController.create
);
orderItensRouter.get(
    '/:id',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    orderItensController.index
);

module.exports = orderItensRouter;
