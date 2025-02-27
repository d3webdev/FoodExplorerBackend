const { v4: uuidv4 } = require('uuid');
const knex = require('../database/knex');

class OrderRepositories {
    constructor() {
        this.timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    async findUserById(user_id) {
        try {
            const user = await knex('users').where('id', user_id).first();
            return user;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findOrderByUserId(user_id, status) {
        try {
            const order = await knex('orders')
                .where('user_id', user_id)
                .where('status', status)
                .first();
            return order;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findById(order_id) {
        try {
            const order = await knex('orders').where('id', order_id).first();
            return order;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async create(user_id) {
        try {
            const order = await knex('orders')
                .insert({
                    id: uuidv4(),
                    user_id: user_id,
                })
                .returning('*')
                .then((rows) => rows[0]);
            return order;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async indexAll() {
        try {
            const orders = await knex('orders').select('*');
            return orders;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async index(user_id) {
        try {
            const orders = await knex('orders')
                .where('user_id', user_id)
                .select('*');
            return orders;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async delete(id) {
        try {
            await knex('orders').where('id', id).del();
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async update(updateData) {
        try {
            await knex('orders').where('id', updateData.id).update(updateData);
        } catch (error) {
            throw new Error(error, 500);
        }
    }
}

module.exports = OrderRepositories;
