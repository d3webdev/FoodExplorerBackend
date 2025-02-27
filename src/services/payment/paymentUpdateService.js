const AppError = require('../../utils/AppError');

class PaymentUpdateService {
    constructor(paymentRepository, orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    async execute(
        user_id,
        role,
        id,
        status,
        method,
        payment_date,
        payment_value
    ) {
        if (!id) {
            throw new AppError('Payment id is required', 400);
        }

        const payment = await this.paymentRepository.findById(id);
        if (!payment) {
            throw new AppError('Payment not found', 404);
        }

        const order = await this.orderRepository.findById(payment.order_id);
        if (user_id !== order.user_id && role !== 'admin') {
            throw new AppError('Unauthorized', 401);
        }

        if (payment.status === 'paid' && role !== 'admin') {
            throw new AppError('Payment already paid', 400);
        }

        if (payment.status === 'canceled' && role !== 'admin') {
            throw new AppError('Payment already canceled', 400);
        }

        const orderItens = await this.paymentRepository.findPaymentsPending(
            payment.order_id
        );

        const amount =
            parseFloat(payment_value) -
            parseFloat(payment.payment_value) +
            parseFloat(
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

        if (status === 'paid') {
            await this.orderRepository.update({
                id: order.id,
                status: 'completed',
                updated_at: this.timeNow,
            });
            payment_date = this.timeNow;
        }

        if (status === 'canceled') {
            await this.orderRepository.update({
                id: order.id,
                status: 'canceled',
                updated_at: this.timeNow,
            });
        }

        const updateData = {
            id,
            updated_at: this.timeNow,
        };

        status && (updateData.status = status);
        method && (updateData.method = method);
        payment_date && (updateData.payment_date = payment_date);
        payment_value && (updateData.payment_value = payment_value);

        status === 'paid' ? (updateData.payment_date = this.timeNow) : null;

        return this.paymentRepository.update(updateData);
    }
}

module.exports = PaymentUpdateService;
