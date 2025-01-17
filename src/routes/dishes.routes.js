const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const DishesController = require('../controller/dishes.Controller');
const DishesImageController = require('../controller/dishesImage.Controller');

const uploadConfig = require('../configs/upload');
const multer = require('multer');

const dishesRouter = Router();
const dishesController = new DishesController();
const dishesImageController = new DishesImageController();

dishesRouter.post(
    '/',
    ensureAuthenticated,
    verifyUserAuthorization(['admin']),
    dishesController.create
);
dishesRouter.delete(
    '/:id',
    ensureAuthenticated,
    verifyUserAuthorization(['admin']),
    dishesController.delete
);
dishesRouter.get(
    '/search',
    ensureAuthenticated,
    verifyUserAuthorization(['admin', 'customer']),
    dishesController.search
);
dishesRouter.put(
    '/',
    ensureAuthenticated,
    verifyUserAuthorization(['admin']),
    dishesController.update
);
dishesRouter.get('/', ensureAuthenticated, dishesController.index);
dishesRouter.patch(
    '/image',
    ensureAuthenticated,
    verifyUserAuthorization(['admin']),
    multer(uploadConfig.MULTER).single('image'),
    dishesImageController.storage
);

module.exports = dishesRouter;
