/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('dish_ingredients', (table) => {
        table.increments('id').primary();
        table
            .integer('dish_id')
            .references('id')
            .inTable('dishes')
            .onDelete('CASCADE');
        table.string('name').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('dish_ingredients');
};
