const { Router } = require('express');
const PaymentController = require('../controller/payment.Controller');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const paymentsRouter = Router();
const paymentController = new PaymentController();

paymentsRouter.post(
    '/',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    paymentController.create
);
paymentsRouter.put(
    '/',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    paymentController.update
);
paymentsRouter.delete(
    '/:id',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    paymentController.delete
);
paymentsRouter.get(
    '/:order_id',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    paymentController.index
);

module.exports = paymentsRouter;
