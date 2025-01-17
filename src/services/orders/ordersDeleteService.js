const AppError = require('../../utils/AppError');

class OrdersDeleteService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    async execute(orderId) {
        const order = await this.ordersRepository.findById(orderId);

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        return this.ordersRepository.delete(orderId);
    }
}

module.exports = OrdersDeleteService;
