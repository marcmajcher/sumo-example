'use strict';

/* eslint-env node */

const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);

module.exports = {
    list: () => knex('wrestlers'),
    get: id => knex('wrestlers').where('id', id).first(),
    create: data => knex('wrestlers').insert(data, '*'),
};
