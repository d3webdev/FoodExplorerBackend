/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders', (table) => {
        table.string('id').primary();
        table
            .integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.decimal('amount', 10, 2).defaultTo(0.0);
        table
            .enum('status', ['pending', 'completed', 'canceled'], {
                useNative: true,
                enumName: 'order_status',
            })
            .notNullable()
            .defaultTo('pending');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('orders');
};
