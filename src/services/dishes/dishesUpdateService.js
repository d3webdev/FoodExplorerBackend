const AppError = require('../../utils/AppError');

class DishesUpdateService {
    constructor(dishesRepositories, diskStorage) {
        this.dishesRepositories = dishesRepositories;
        this.diskStorage = diskStorage;
        this.timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    async execute({
        id,
        name,
        description,
        price,
        discount,
        category,
        ingredients,
    }) {
        if (!id) {
            throw new AppError('ID is required', 400);
        }

        const checkDishExists = await this.dishesRepositories.findById(id);

        if (!checkDishExists) {
            throw new AppError('Dish not found', 404);
        }

        const updateData = {
            id,
            updated_at: this.timeNow,
        };
        name && (updateData.name = name);
        description && (updateData.description = description);
        price && (updateData.price = price);
        discount && (updateData.discount = discount);
        category && (updateData.category = category);
        ingredients && (updateData.ingredients = ingredients);

        // if (!image && checkDishExists.image) {
        //     await this.diskStorage.delete(checkDishExists.image);
        //     updateData.image = null;
        // }

        const response = await this.dishesRepositories.update(updateData);

        return response;
    }
}

module.exports = DishesUpdateService;
