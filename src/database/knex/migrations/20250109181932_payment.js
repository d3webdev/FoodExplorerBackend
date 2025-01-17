/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('payment', (table) => {
        table.increments('id').primary();
        table
            .string('order_id')
            .references('id')
            .inTable('orders')
            .onDelete('CASCADE');
        table
            .enum('status', ['pending', 'paid', 'canceled'], {
                useNative: true,
                enumName: 'payment_status',
            })
            .notNullable()
            .defaultTo('pending');
        table
            .enum('method', ['credit_card', 'debit_card', 'pix'], {
                useNative: true,
                enumName: 'payment_method',
            })
            .notNullable()
            .defaultTo('credit_card');
        table.timestamp('payment_date');
        table.decimal('payment_value', 10, 2).defaultTo(0.0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('payment');
};
