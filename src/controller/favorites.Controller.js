const repositories = require('../repositories');

const FavoritesCreateService = require('../services/favorites/favoritesCreateService');
const FavoritesListService = require('../services/favorites/favoritesListService');
const FavoritesDeleteService = require('../services/favorites/favoritesDeleteService');

class FavoritesController {
    async index(req, res) {
        const { id: user_id } = req.user;
        const favoritesListService = new FavoritesListService(
            repositories.favoriteRepository,
            repositories.userRepository
        );

        const favorites = await favoritesListService.execute(user_id);
        return res.status(200).json(favorites);
    }

    async create(req, res) {
        const { id: user_id } = req.user;
        const { dish_id } = req.params;

        const favoritesCreateService = new FavoritesCreateService(
            repositories.favoriteRepository,
            repositories.userRepository,
            repositories.dishRepository
        );

        const response = await favoritesCreateService.execute(user_id, dish_id);
        return res.status(201).json(response);
    }

    async delete(req, res) {
        const { dish_id } = req.params;
        const { id: user_id } = req.user;

        const favoritesDeleteService = new FavoritesDeleteService(
            repositories.favoriteRepository,
            repositories.dishRepository
        );

        const response = await favoritesDeleteService.execute(user_id, dish_id);
        return res.status(200).json(response);
    }
}

module.exports = FavoritesController;
