'use strict';

/* eslint-env node */

const matchList = [{
    date: '2000-12-17',
    eastid: 1,
    westid: 5,
    winner: 'east'
  },
  {
    date: '2001-03-04',
    eastid: 3,
    westid: 2,
    winner: 'east'
  },
  {
    date: '2002-09-24',
    eastid: 5,
    westid: 6,
    winner: 'west'
  },
  {
    date: '2003-02-27',
    eastid: 1,
    westid: 2,
    winner: 'east'
  },
  {
    date: '2003-06-02',
    eastid: 5,
    westid: 6,
    winner: 'east'
  },
  {
    date: '2003-10-16',
    eastid: 2,
    westid: 3,
    winner: 'east'
  },
  {
    date: '2004-09-20',
    eastid: 1,
    westid: 2,
    winner: 'west'
  },
  {
    date: '2005-11-04',
    eastid: 3,
    westid: 4,
    winner: 'east'
  },
  {
    date: '2006-09-24',
    eastid: 5,
    westid: 6,
    winner: 'west'
  },
  {
    date: '2008-06-04',
    eastid: 2,
    westid: 1,
    winner: 'east'
  },
  {
    date: '2009-11-17',
    eastid: 1,
    westid: 6,
    winner: 'west'
  },
  {
    date: '2009-12-18',
    eastid: 1,
    westid: 2,
    winner: 'west'
  },
  {
    date: '2010-02-13',
    eastid: 3,
    westid: 4,
    winner: 'east'
  },
  {
    date: '2010-08-06',
    eastid: 6,
    westid: 1,
    winner: 'east'
  },
  {
    date: '2010-09-14',
    eastid: 2,
    westid: 6,
    winner: 'west'
  },
  {
    date: '2012-07-30',
    eastid: 3,
    westid: 4,
    winner: 'east'
  },
  {
    date: '2013-06-27',
    eastid: 2,
    westid: 4,
    winner: 'west'
  },
  {
    date: '2013-07-22',
    eastid: 5,
    westid: 1,
    winner: 'east'
  },
  {
    date: '2015-12-02',
    eastid: 5,
    westid: 3,
    winner: 'east'
  },
  {
    date: '2016-07-04',
    eastid: 2,
    westid: 4,
    winner: 'east'
  },
];

exports.seed = knex => knex('matches').del()
  .then(() => knex('matches').insert(matchList));
