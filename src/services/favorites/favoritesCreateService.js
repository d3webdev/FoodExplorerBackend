const AppError = require('../../utils/AppError');

class FavoritesCreateService {
    constructor(favoritesRepository, userRepository, dishRepository) {
        this.favoritesRepository = favoritesRepository;
        this.userRepository = userRepository;
        this.dishRepository = dishRepository;
    }

    async execute(userId, dishId) {
        const userIdExists = await this.userRepository.findById(userId);
        if (!userIdExists) {
            throw new AppError('User not found', 404);
        }

        const dishExists = await this.dishRepository.findById(dishId);
        if (!dishExists) {
            throw new AppError('Dish not exists', 404);
        }

        const favoriteExists = await this.favoritesRepository.findFavorite(
            userId,
            dishId
        );
        if (favoriteExists) {
            throw new AppError('This dish is already a favorite', 404);
        }

        await this.favoritesRepository.create(userId, dishId);

        return `${dishExists.name} has been added to your favorites`;
    }
}

module.exports = FavoritesCreateService;
