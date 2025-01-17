const AppError = require('../../utils/AppError');
const dishesCategories = require('../../utils/dishesCategories');

class DishesCreateService {
    constructor(dishesRepositories) {
        this.dishesRepositories = dishesRepositories;
    }

    async execute({
        name,
        description,
        price,
        discount,
        category,
        ingredients,
    }) {
        if (!dishesCategories.has(category)) {
            throw new AppError('Invalid category', 400);
        }

        if (
            !name ||
            !description ||
            !price ||
            !discount ||
            !category ||
            !ingredients
        ) {
            const missingParams = [];
            !name ? missingParams.push('name') : null;
            !description ? missingParams.push('description') : null;
            !price ? missingParams.push('price') : null;
            !discount ? missingParams.push('discount') : null;
            !category ? missingParams.push('category') : null;
            !ingredients ? missingParams.push('ingredients') : null;
            throw new AppError('Missing fields: ' + missingParams, 400);
        }

        const response = await this.dishesRepositories.create({
            name,
            description,
            price,
            discount,
            category,
            ingredients,
        });

        return response;
    }
}

module.exports = DishesCreateService;
