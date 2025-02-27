const AppError = require('../../utils/AppError');

class PaymentCreateService {
    constructor(paymentRepository, orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    async execute(user_id, role, order_id, payment_value) {
        const order = await this.orderRepository.findById(order_id);
        if (!order) {
            throw new AppError('Order not found', 404);
        }

        if (user_id !== order.user_id && role !== 'admin') {
            throw new AppError('Unauthorized', 401);
        }

        const orderItens =
            await this.paymentRepository.findPaymentsPending(order_id);

        if (orderItens.length === 1) {
            const response = await this.paymentRepository.update({
                id: orderItens[0].id,
                payment_value: payment_value,
            });

            return response;
        }

        const amount = parseFloat(
            orderItens
                .reduce((acc, item) => {
                    return acc + item.payment_value;
                }, 0)
                .toFixed(2)
        );

        if (amount > order.amount) {
            throw new AppError(
                'Payment value is greater than the order amount',
                400
            );
        }

        const response = await this.paymentRepository.create(
            order_id,
            payment_value
        );
        return response;
    }
}

module.exports = PaymentCreateService;
