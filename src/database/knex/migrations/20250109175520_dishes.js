/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('dishes', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('image');
        table.decimal('price', 10, 2).defaultTo(0.0);
        table.decimal('discount', 10, 1).defaultTo(0);
        table
            .enum('category', ['refeição', 'sobremesa', 'bebida'], {
                useNative: true,
                enumName: 'dish_category',
            })
            .notNullable()
            .defaultTo('refeição');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('dishes');
};
