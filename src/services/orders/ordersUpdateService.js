const AppError = require('../../utils/AppError');

class OrdersUpdateService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
        this.timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    async execute(user_id, role, orderId, orderStatus, orderAmount) {
        const order = await this.ordersRepository.findById(orderId);

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        if (role !== 'admin' && order.user_id !== user_id) {
            throw new AppError('You are not allowed to update this order', 403);
        }

        const updateData = {
            id: orderId,
            updated_at: this.timeNow,
        };

        orderStatus && (updateData.status = orderStatus);
        orderAmount && (updateData.amount = orderAmount);

        return this.ordersRepository.update(updateData);
    }
}

module.exports = OrdersUpdateService;
