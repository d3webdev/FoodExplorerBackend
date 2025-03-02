// const AppError = require('../../utils/AppError');

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

        return response;
    }
}

module.exports = OrdersListService;
