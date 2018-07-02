'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('wrestlers', (table) => {
    table.increments();
    table.string('name').unique().notNullable();
    table.integer('weight').unsigned().notNullable();
});

exports.down = knex => knex.schema.dropTable('wrestlers');

