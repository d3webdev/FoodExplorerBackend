const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const UsersController = require('../controller/users.Controller');

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.get(
    '/list/:list',
    ensureAuthenticated,
    verifyUserAuthorization('admin'),
    usersController.index
);
usersRouter.delete(
    '/:id',
    ensureAuthenticated,
    verifyUserAuthorization('admin'),
    usersController.delete
);
usersRouter.put(
    '/',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    usersController.update
);

module.exports = usersRouter;
