const AppError = require('../../utils/AppError');

class PaymentDeleteService {
    constructor(paymentRepository, orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    async execute(user_id, role, id) {
        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new AppError('Payment not found', 404);
        }

        const order = await this.orderRepository.findById(payment.order_id);
        if (order.status === 'completed') {
            throw new AppError('Order this payment already completed', 400);
        }

        if (payment.status === 'paid' && role !== 'admin') {
            throw new AppError('Payment already paid', 400);
        }

        if (payment.status === 'canceled' && role !== 'admin') {
            throw new AppError('Payment already canceled', 400);
        }

        if (order.user_id !== user_id && role !== 'admin') {
            throw new AppError('Unauthorized', 401);
        }

        await this.paymentRepository.delete(id);

        return 'Payment deleted';
    }
}

module.exports = PaymentDeleteService;
