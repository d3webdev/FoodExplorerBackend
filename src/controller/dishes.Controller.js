const repositores = require('../repositories');
const DishesSearchService = require('../services/dishes/dishesSearchService');
const DishesCreateService = require('../services/dishes/dishesCreateService');
const DishesDeleteService = require('../services/dishes/dishesDeleteServices');
const DishUpdateService = require('../services/dishes/dishesUpdateService');
const DishesListService = require('../services/dishes/dishesListService');
const DiskStorage = require('../provider/diskStorage');

class DishesController {
    async create(req, res) {
        const dishesCreateService = new DishesCreateService(
            repositores.dishRepository
        );

        const { name, description, price, discount, category, ingredients } =
            req.body;

        const response = await dishesCreateService.execute({
            name,
            description,
            price,
            discount,
            category,
            ingredients,
        });

        return res.status(201).json(response);
    }

    async delete(req, res) {
        const { id } = req.params;
        const dishesDeleteService = new DishesDeleteService(
            repositores.dishRepository
        );

        await dishesDeleteService.deleteDish(id);

        return res.status(200).json('Dish deleted successfully');
    }

    async search(req, res) {
        const { search } = req.query;

        const dishesSearchService = new DishesSearchService(
            repositores.dishRepository
        );

        const response = await dishesSearchService.execute(search);

        return res.status(200).json(response);
    }

    async update(req, res) {
        const diskStorage = new DiskStorage();
        const dishUpdateService = new DishUpdateService(
            repositores.dishRepository,
            diskStorage
        );

        const {
            id,
            name,
            description,
            image,
            price,
            discount,
            category,
            ingredients,
        } = req.body;

        const response = await dishUpdateService.execute({
            id,
            name,
            description,
            image,
            price,
            discount,
            category,
            ingredients,
        });

        return res.status(200).json(response);
    }

    async index(req, res) {
        const { id: user_id } = req.user;
        const dishesListService = new DishesListService(
            repositores.dishRepository
        );

        const response = await dishesListService.execute(user_id);

        return res.status(200).json(response);
    }
}

module.exports = DishesController;
