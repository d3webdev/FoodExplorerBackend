const AppError = require('../../utils/AppError');

class DishesDeleteServices {
    constructor(dishesRepositories) {
        this.dishesRepositories = dishesRepositories;
    }

    async deleteDish(dishId) {
        const dish = await this.dishesRepositories.findById(dishId);
        if (!dish) {
            throw new AppError('Dish not found');
        }

        const response = await this.dishesRepositories.delete(dishId);

        return response;
    }
}

module.exports = DishesDeleteServices;
