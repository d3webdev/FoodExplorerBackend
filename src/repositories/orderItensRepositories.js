const knex = require('../database/knex');

class OrderItensRepositories {
    async findById(id) {
        try {
            const item = await knex('order_itens').where('id', id).first();
            return item;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findItensByOrderId(order_id) {
        try {
            const itens = await knex('order_itens').where('order_id', order_id);
            return itens;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findItemByDishId(order_id, dish_id) {
        try {
            const item = await knex('order_itens')
                .where('order_id', order_id)
                .where('dish_id', dish_id)
                .first();
            return item;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async create(order_id, dish_id, quantity, amount) {
        try {
            const item = await knex('order_itens')
                .insert({
                    order_id,
                    dish_id,
                    quantity,
                    amount,
                })
                .returning('*');
            return item;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async delete(id) {
        try {
            await knex('order_itens').where('id', id).del();
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async update(id, quantity, amount) {
        try {
            return await knex('order_itens')
                .where('id', id)
                .update({
                    quantity,
                    amount,
                })
                .returning('*');
        } catch (error) {
            throw new Error(error, 500);
        }
    }
}

module.exports = OrderItensRepositories;
