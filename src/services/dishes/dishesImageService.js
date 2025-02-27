const AppError = require('../../utils/AppError');

class DishesImageService {
    constructor(dishesRepository, diskStorage) {
        this.dishesRepository = dishesRepository;
        this.diskStorage = diskStorage;
    }
    async execute(filename, dish_id) {
        const dish = await this.dishesRepository.findById(dish_id);

        if (!dish) {
            throw new AppError('Dish not found', 404);
        }

        if (dish.image) {
            await this.diskStorage.delete(dish.image);
        }

        const dish_image = await this.diskStorage.save(filename);
        dish.image = dish_image;

        const response = await this.dishesRepository.update(dish);

        return response;
    }
}

module.exports = DishesImageService;
