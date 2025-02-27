const knex = require('../database/knex');

class PaymentRepositories {
    async findById(id) {
        try {
            const payment = await knex('payment').where('id', id).first();
            return payment;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findPaymentsByOrderId(order_id) {
        try {
            const payments = await knex('payment').where('order_id', order_id);
            return payments;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findPaymentsPending(order_id) {
        try {
            const payments = await knex('payment')
                .where('order_id', order_id)
                .where('status', 'pending');
            return payments;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findByOrderId(order_id) {
        try {
            const payments = await knex('payment').where('order_id', order_id);
            return payments;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async create(order_id, payment_value) {
        try {
            const payment = await knex('payment')
                .insert({
                    order_id,
                    payment_value,
                })
                .returning('*');
            return payment;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async update(updateData) {
        try {
            const updated = await knex('payment')
                .where('id', updateData.id)
                .update(updateData)
                .returning('*');
            return updated[0];
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async delete(id) {
        try {
            await knex('payment').where('id', id).del();
        } catch (error) {
            throw new Error(error, 500);
        }
    }
}

module.exports = PaymentRepositories;
