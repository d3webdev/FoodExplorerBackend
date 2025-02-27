class DishesListService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository;
    }

    async execute(user_id) {
        const dishes = await this.dishesRepository.index(user_id);
        return dishes;
    }
}

module.exports = DishesListService;
