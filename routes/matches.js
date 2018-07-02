'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const Match = require('../models/match');

router.get('/', (req, res) => {
  Match.list.then((data) => {
    res.render('matches', {
      data,
      title: 'Matches',
    });
  });
});

module.exports = router;
