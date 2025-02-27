const knex = require('../database/knex');

class DishRepositories {
    constructor() {
        this.timeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    async findById(id) {
        const dish = await knex('dishes').where('id', id).first();
        return dish;
    }

    async delete(id) {
        try {
            await knex('dishes').where('id', id).del();
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async search(searchTerm) {
        try {
            const dishes = await knex('dishes')
                .join(
                    'dish_ingredients',
                    'dishes.id',
                    '=',
                    'dish_ingredients.dish_id'
                )
                .select(
                    'dishes.id as id',
                    'dishes.name as dish_name',
                    'dishes.description as dish_description',
                    'dishes.image as image',
                    'dishes.price as dish_price',
                    'dishes.discount as dish_discount',
                    'dishes.category as dish_category'
                )
                .where('dishes.name', 'like', `%${searchTerm}%`)
                .orWhere('dish_ingredients.name', 'like', `%${searchTerm}%`)
                .orWhere('dishes.description', 'like', `%${searchTerm}%`)
                .groupBy('dishes.id');

            let allDishes = await Promise.allSettled(
                dishes.map(async (dish) => {
                    const ingredients = await knex('dish_ingredients')
                        .select('id', 'name')
                        .where('dish_id', dish.id);
                    return { ...dish, ingredients };
                })
            );

            return allDishes;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async update(updateData) {
        try {
            if (updateData.image) {
                const response = await knex('dishes')
                    .where('id', updateData.id)
                    .update({ image: updateData.image });

                return response;
            }

            await knex('dish_ingredients')
                .where('dish_id', updateData.id)
                .del();

            if (updateData.ingredients) {
                const dishIngredients = updateData.ingredients.map(
                    (ingredient) => {
                        return {
                            dish_id: updateData.id,
                            name: ingredient,
                        };
                    }
                );
                await knex('dish_ingredients').insert(dishIngredients);
            }

            delete updateData.ingredients;

            const response = await knex('dishes')
                .where('id', updateData.id)
                .update(updateData)
                .returning('*');
            return response;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async create({
        name,
        description,
        price,
        discount,
        category,
        ingredients,
    }) {
        try {
            const [dishId] = await knex('dishes').insert({
                name,
                description,
                price,
                discount,
                category,
            });

            const dishIngredients = ingredients.map((ingredient) => {
                return {
                    dish_id: dishId,
                    name: ingredient,
                };
            });

            await knex('dish_ingredients').insert(dishIngredients);

            return { dish_id: dishId };
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async index(user_id) {
        try {
            const dishes = await knex('dishes').select('*');

            const allDishes = await Promise.all(
                dishes.map(async (dish) => {
                    const ingredients = await knex('dish_ingredients')
                        .select('id', 'name')
                        .where('dish_id', dish.id);
                    const favorites = await knex('dish_favorites')
                        .select('user_id')
                        .where('dish_id', dish.id)
                        .andWhere('user_id', user_id);
                    favorites.length !== 0
                        ? (dish.favorite = true)
                        : (dish.favorite = false);
                    return { ...dish, ingredients };
                })
            );

            return allDishes;
        } catch (error) {
            throw new Error(error, 500);
        }
    }

    async favoriteDish(userId, dishId) {
        try {
            await knex('favorite_dishes').insert({
                user_id: userId,
                dish_id: dishId,
            });
        } catch (error) {
            throw new Error(error, 500);
        }
    }
}

module.exports = DishRepositories;
