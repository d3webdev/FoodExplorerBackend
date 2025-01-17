const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const FavoritesController = require('../controller/favorites.Controller');

const favoritesRouter = Router();
const favoritesController = new FavoritesController();

favoritesRouter.get('/', ensureAuthenticated, favoritesController.index);
favoritesRouter.post(
    '/:dish_id',
    ensureAuthenticated,
    favoritesController.create
);
favoritesRouter.delete(
    '/:dish_id',
    ensureAuthenticated,
    favoritesController.delete
);

module.exports = favoritesRouter;
