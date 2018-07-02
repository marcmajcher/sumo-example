'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const Match = require('../models/match');

router.get('/', (req, res) => {
  Match.list().then((data) => {
    res.render('matches', {
      data,
      title: 'Matches',
    });
  });
});

router.get('/:id', (req, res) => {
  Match.get(req.params.id).then((data) => {
    res.render('matchinfo', {
      data,
      title: 'Match Info'
    });
  });
});


module.exports = router;
