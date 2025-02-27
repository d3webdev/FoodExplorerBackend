const repositories = require('../repositories');

const OrderItensService = require('../services/orderItens/orderItensService');
// const OrdersCreateService = require('../services/orders/ordersCreateService');
const OrdersBalanceService = require('../services/orders/ordersBalanceService');
const OrderItensListService = require('../services/orderItens/orderItensListService');

class OrderItensController {
    async create(req, res) {
        //const { id: user_id } = req.user;
        const { order_id, dish_id, quantity } = req.body;

        // const ordersCreateService = new OrdersCreateService(
        //     repositories.orderRepository
        // );

        // const order = await ordersCreateService.execute(user_id);

        const orderItensService = new OrderItensService(
            repositories.orderItensRepository,
            repositories.dishRepository,
            repositories.orderRepository
        );

        const item = await orderItensService.execute(
            order_id,
            dish_id,
            quantity
        );

        const ordersBalanceService = new OrdersBalanceService(
            repositories.orderRepository,
            repositories.orderItensRepository
        );

        await ordersBalanceService.execute(order_id);

        return res.status(201).json(item);
    }

    async index(req, res) {
        const { id: order_id } = req.params;
        const { id: user_id } = req.user;

        const orderItensListService = new OrderItensListService(
            repositories.orderItensRepository,
            repositories.orderRepository,
            repositories.dishRepository
        );

        const orderItens = await orderItensListService.execute(
            user_id,
            order_id
        );

        return res.status(201).json(orderItens);
    }
}

module.exports = OrderItensController;
