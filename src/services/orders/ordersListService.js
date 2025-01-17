const AppError = require('../../utils/AppError');

class OrdersListService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    async execute(role, user_id) {
        let response = null;
        if (role !== 'admin') {
            response = await this.ordersRepository.index(user_id);
        } else {
            response = await this.ordersRepository.indexAll();
        }

        if (response.length === 0) {
            throw new AppError('Orders not found', 404);
        }

        return response;
    }
}

module.exports = OrdersListService;
