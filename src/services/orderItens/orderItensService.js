const AppError = require('../../utils/AppError');

class OrderItensService {
    constructor(orderItensRepository, dishRepository, orderRepository) {
        this.orderItensRepository = orderItensRepository;
        this.dishRepository = dishRepository;
        this.orderRepository = orderRepository;
    }

    async execute(order_id, dish_id, quantity) {
        const dishExists = await this.dishRepository.findById(dish_id);
        if (!dishExists) {
            throw new AppError('Dish not found', 404);
        }

        const itemExists = await this.orderItensRepository.findItemByDishId(
            order_id,
            dish_id
        );

        const amount = parseFloat(dishExists.price) * Number(quantity);

        if (amount > 0) {
            if (itemExists) {
                const response = await this.update(
                    itemExists.id,
                    quantity,
                    amount
                );
                return response;
            } else {
                const response = await this.create(
                    order_id,
                    dish_id,
                    quantity,
                    amount
                );
                return response;
            }
        } else {
            if (itemExists) {
                const response = await this.delete(order_id, itemExists.id);
                return response;
            } else {
                return 'without changes';
            }
        }
    }

    async create(order_id, dish_id, quantity, amount) {
        const response = await this.orderItensRepository.create(
            order_id,
            dish_id,
            quantity,
            amount
        );
        return response;
    }

    async delete(order_id, item_id) {
        const order = await this.orderRepository.findById(order_id);
        if (!order) {
            throw new AppError('Order not Exists');
        }

        const itemExists = await this.orderItensRepository.findById(item_id);
        if (!itemExists || itemExists.order_id !== order_id) {
            throw new AppError('Item not Exists');
        }

        await this.orderItensRepository.delete(item_id);
        return 0;
    }

    async update(item_id, quantity, amount) {
        quantity = parseInt(quantity);

        const itemExists = await this.orderItensRepository.findById(item_id);
        if (!itemExists) {
            throw new AppError('Item not found', 404);
        }

        return await this.orderItensRepository.update(
            item_id,
            quantity,
            amount
        );
    }
}

module.exports = OrderItensService;
