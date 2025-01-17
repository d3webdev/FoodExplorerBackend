const AppError = require('../../utils/AppError');

class OrderItensListService {
    constructor(orderItensRepository, orderRepository) {
        this.orderItensRepository = orderItensRepository;
        this.orderRepository = orderRepository;
    }

    async execute(order_id) {
        const orderExists = await this.orderRepository.findById(order_id);
        if (!orderExists) {
            throw new AppError('Order not found', 404);
        }
        const orderItens =
            await this.orderItensRepository.findItensByOrderId(order_id);

        return orderItens;
    }
}

module.exports = OrderItensListService;
