const AppError = require('../../utils/AppError');

class OrderItensListService {
    constructor(orderItensRepository, orderRepository, dishRepository) {
        this.orderItensRepository = orderItensRepository;
        this.orderRepository = orderRepository;
        this.dishRepository = dishRepository;
    }

    async execute(user_id, order_id) {
        const orderExists = await this.orderRepository.findById(order_id);
        if (!orderExists) {
            throw new AppError('Order not found', 404);
        }
        const orderItens =
            await this.orderItensRepository.findItensByOrderId(order_id);

        const dishes = await this.dishRepository.index(user_id);

        orderItens.map((item) => {
            const dish = dishes.find(
                (itemDish) => itemDish.id === item.dish_id
            );

            item.image = dish.image;
            item.name = dish.name;
            item.price = dish.price;
            item.description = dish.description;
            item.discount = dish.discount;

            return item;
        });

        return orderItens;
    }
}

module.exports = OrderItensListService;
