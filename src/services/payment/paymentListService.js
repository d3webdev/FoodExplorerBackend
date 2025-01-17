const AppError = require('../../utils/AppError');

class PaymentListService {
    constructor(paymentRepository, orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    async execute(user_id, role, order_id) {
        const order = await this.orderRepository.findById(order_id);
        if (!order) {
            throw new AppError('Order not found', 404);
        }

        if (user_id !== order.user_id && role !== 'admin') {
            throw new AppError('Unauthorized', 401);
        }

        const response = this.paymentRepository.findByOrderId(order_id);

        return response;
    }
}

module.exports = PaymentListService;
