const AppError = require('../../utils/AppError');

class FavoritesListService {
    constructor(favoritesRepository, userRepository) {
        this.favoritesRepository = favoritesRepository;
        this.userRepository = userRepository;
    }

    async execute(user_id) {
        const userExists = await this.userRepository.findById(user_id);
        if (!userExists) {
            throw new AppError('User not found', 404);
        }

        const response = await this.favoritesRepository.index(user_id);

        return response;
    }
}

module.exports = FavoritesListService;
