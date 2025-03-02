class DishesSearchService {
    constructor(dishesRepositories) {
        this.dishesRepositories = dishesRepositories;
    }

    async execute(term) {
        console.log('SEARCH', term);
        const response = await this.dishesRepositories.search(term);
        return response;
    }
}

module.exports = DishesSearchService;
