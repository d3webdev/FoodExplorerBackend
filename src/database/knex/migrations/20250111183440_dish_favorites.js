/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('dish_favorites', (table) => {
        table.increments('id').primary();
        table
            .integer('dish_id')
            .references('id')
            .inTable('dishes')
            .onDelete('CASCADE');
        table
            .integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.unique(['dish_id', 'user_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('dish_favorites');
};
