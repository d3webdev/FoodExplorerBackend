const AppError = require('../../utils/AppError');

class FavoritesDeleteService {
    constructor(favoritesRepository, dishesRepository) {
        this.favoritesRepository = favoritesRepository;
        this.dishesRepository = dishesRepository;
    }

    async execute(user_id, dish_id) {
        const favoriteExists = await this.favoritesRepository.findFavorite(
            user_id,
            dish_id
        );

        if (!favoriteExists) {
            throw new AppError('Favorite not Exist', 404);
        }

        const dish = await this.dishesRepository.findById(dish_id);

        await this.favoritesRepository.delete(favoriteExists.id);

        return `${dish.name} has been removed from your favorites`;
    }
}

module.exports = FavoritesDeleteService;
