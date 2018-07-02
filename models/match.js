'use strict';

/* eslint-env node */

const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config);

module.exports = {
    // list: () => knex('matches'),
    list: () => knex.select('matches.id', 'date', 'eastlers.name as eastname', 'westlers.name as westname', 'winner')
    .from('matches')
    .leftJoin('wrestlers as eastlers', 'matches.eastid', 'eastlers.id')
    .leftJoin('wrestlers as westlers', 'matches.westid', 'westlers.id'),
    get: id => knex('matches').where('id', id).first(),
};
