class OrdersBalanceService {
    constructor(orderRepository, orderItensRepository) {
        this.orderRepository = orderRepository;
        this.orderItensRepository = orderItensRepository;
        this.timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    async execute(order_id) {
        const order = await this.orderRepository.findById(order_id);
        const orderItens = await this.orderItensRepository.findItensByOrderId(
            order.id
        );

        const amount = parseFloat(
            orderItens
                .reduce((acc, item) => {
                    return acc + item.amount;
                }, 0)
                .toFixed(2)
        );

        if (amount === 0) {
            await this.orderRepository.delete(order.id);
            return { amount };
        }

        const updateData = {
            id: order.id,
            status: order.status,
            amount,
            updated_at: this.timeNow,
        };

        await this.orderRepository.update(updateData);

        return { amount };
    }
}

module.exports = OrdersBalanceService;
