const repositores = require('../repositories');
const DiskStorage = require('../provider/diskStorage');
const DishesImageService = require('../services/dishes/dishesImageService');

class DishesImageController {
    async storage(req, res) {
        const { filename } = req.file;
        const { dish_id } = req.body;

        const diskStorage = new DiskStorage();
        const dishesImageService = new DishesImageService(
            repositores.dishRepository,
            diskStorage
        );

        const image = await dishesImageService.execute(filename, dish_id);

        return res.status(201).json(image);
    }
}

module.exports = DishesImageController;
