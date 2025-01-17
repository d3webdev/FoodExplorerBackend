class DishesListService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository;
    }

    async execute() {
        const dishes = await this.dishesRepository.index();
        return dishes;
    }
}

module.exports = DishesListService;
