const repositories = require('../repositories');

const PaymentListService = require('../services/payment/paymentListService');
const PaymentCreateService = require('../services/payment/paymentCreateService');
const PaymentUpdateService = require('../services/payment/paymentUpdateService');
const PaymentDeleteService = require('../services/payment/paymentDeleteService');

class PaymentController {
    async create(req, res) {
        const { id: user_id, role } = req.user;
        const { order_id, payment_value } = req.body;
        const paymentCreateService = new PaymentCreateService(
            repositories.paymentRepository,
            repositories.orderRepository,
            repositories.orderItensRepository
        );
        const response = await paymentCreateService.execute(
            user_id,
            role,
            order_id,
            payment_value
        );

        return res.status(201).json(response);
    }

    async update(req, res) {
        const { id: user_id, role } = req.user;
        const { id, status, method, payment_date, payment_value } = req.body;

        const paymentUpdateService = new PaymentUpdateService(
            repositories.paymentRepository,
            repositories.orderRepository
        );

        const response = await paymentUpdateService.execute(
            user_id,
            role,
            id,
            status,
            method,
            payment_date,
            payment_value
        );

        return res.status(200).json(response);
    }

    async delete(req, res) {
        const { id: user_id, role } = req.user;
        const { id } = req.params;

        const paymentDeleteService = new PaymentDeleteService(
            repositories.paymentRepository,
            repositories.orderRepository
        );

        const response = await paymentDeleteService.execute(user_id, role, id);

        return res.status(200).json(response);
    }

    async index(req, res) {
        const { id: user_id, role } = req.user;
        const { order_id } = req.params;

        const paymentListService = new PaymentListService(
            repositories.paymentRepository,
            repositories.orderRepository
        );

        const response = await paymentListService.execute(
            user_id,
            role,
            order_id
        );

        return res.status(200).json(response);
    }
}

module.exports = PaymentController;
