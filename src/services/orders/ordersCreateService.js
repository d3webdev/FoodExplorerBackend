const AppError = require('../../utils/AppError');

class OrdersCreateService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(user_id) {
        const userExists = await this.orderRepository.findUserById(user_id);
        if (!userExists) {
            throw new AppError('User not found', 404);
        }

        const orderExists = await this.orderRepository.findOrderByUserId(
            user_id,
            'pending'
        );

        if (orderExists) {
            return orderExists;
        }

        const orderCreated = await this.orderRepository.create(user_id);
        return orderCreated;
    }
}

module.exports = OrdersCreateService;
