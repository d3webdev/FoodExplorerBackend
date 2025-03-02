const knex = require('../database/knex');

class userRepositories {
    constructor() {
        this.timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    async findByEmail(email) {
        try {
            const user = await knex('users').where('email', email).first();
            return user;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async getAll() {
        try {
            const users = await knex('users').select(
                'id',
                'name',
                'email',
                'role',
                'created_at',
                'updated_at'
            );

            return users;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findAll(role) {
        try {
            const users = await knex('users')
                .select(
                    'id',
                    'name',
                    'email',
                    'role',
                    'created_at',
                    'updated_at'
                )
                .where('role', role);

            return users;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findById(id) {
        try {
            const user = await knex('users').where('id', id).first();
            return user;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async remove(id) {
        try {
            await knex('users').where('id', id).del();
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async update(updateData) {
        try {
            await knex('users').where('id', updateData.id).update(updateData);
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async createUser({ name, email, role, password }) {
        try {
            const userId = await knex('users').insert({
                name,
                email,
                role,
                password,
            });

            return { id: userId };
        } catch (error) {
            throw new Error(error, 500);
        }
    }
}

module.exports = userRepositories;
