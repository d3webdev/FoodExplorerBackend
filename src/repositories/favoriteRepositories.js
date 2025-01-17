const knex = require('../database/knex');

class FavoriteRepositories {
    async findFavorite(userId, dishId) {
        try {
            const favorite = await knex('dish_favorites')
                .where('user_id', userId)
                .where('dish_id', dishId)
                .first();
            return favorite;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async findFavoriteByUserId(id) {
        try {
            const favorites = await knex('dish_favorites').where('user_id', id);
            return favorites;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async create(userId, dishId) {
        try {
            await knex('dish_favorites').insert({
                user_id: userId,
                dish_id: dishId,
            });
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async delete(id) {
        try {
            await knex('dish_favorites').where('id', id).del();
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async index(userId) {
        try {
            const favorites = await knex('dish_favorites')
                .where('user_id', userId)
                .select('*');
            return favorites;
        } catch (error) {
            throw new Error(error, 500);
        }
    }
}

module.exports = FavoriteRepositories;
