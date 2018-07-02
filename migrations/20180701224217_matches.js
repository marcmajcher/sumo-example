'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('matches', (table) => {
    table.increments();
    table.date('date').notNullable();
    table.integer('eastid').unsigned().references('wrestlers.id').onDelete('CASCADE');
    table.integer('westid').unsigned().references('wrestlers.id').onDelete('CASCADE');
    table.enu('winner', ['east', 'west']).notNullable();
});

exports.down = knex => knex.schema.dropTable('matches');

