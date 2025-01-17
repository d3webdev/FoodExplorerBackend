/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('order_itens', (table) => {
        table.increments('id').primary();
        table
            .string('order_id')
            .references('id')
            .inTable('orders')
            .onDelete('CASCADE');
        table
            .integer('dish_id')
            .references('id')
            .inTable('dishes')
            .onDelete('CASCADE');
        table.integer('quantity').notNullable();
        table.decimal('amount', 10, 2).defaultTo(0.0);
        table.unique(['order_id', 'dish_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('order_itens');
};
