const OrderRepository = require('../repositories/orderRepositories');
const OrdersListService = require('../services/orders/ordersListService');
const OrdersCreateService = require('../services/orders/ordersCreateService');
const OrdersDeleteService = require('../services/orders/ordersDeleteService');
const OrdersUpdateService = require('../services/orders/ordersUpdateService');

class OrdersController {
    async create(req, res) {
        const orderRepository = new OrderRepository();
        const ordersCreateService = new OrdersCreateService(orderRepository);

        const { id: user_id } = req.user;

        const response = await ordersCreateService.execute(user_id);

        return res.status(201).json(response);
    }

    async index(req, res) {
        const orderRepository = new OrderRepository();
        const ordersListService = new OrdersListService(orderRepository);

        const { role, id: user_id } = req.user;

        const response = await ordersListService.execute(role, user_id);

        return res.status(201).json(response);
    }

    async delete(req, res) {
        const { id } = req.params;
        const orderRepository = new OrderRepository();
        const ordersDeleteService = new OrdersDeleteService(orderRepository);

        await ordersDeleteService.execute(id);

        return res.status(200).json('Order deleted successfully');
    }

    async update(req, res) {
        const { id: user_id, role } = req.user;
        const { id, status, amount } = req.body;
        const orderRepository = new OrderRepository();
        const ordersUpdateService = new OrdersUpdateService(orderRepository);

        await ordersUpdateService.execute(user_id, role, id, status, amount);

        return res.status(200).json('Order updated successfully');
    }
}

module.exports = OrdersController;
