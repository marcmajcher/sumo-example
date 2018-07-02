'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const Wrestler = require('../models/wrestler');

router.get('/', (req, res) => {
  Wrestler.list().then((data) => {
    res.render('wrestlers', {
      data,
      title: 'Sumo Wrestlers',
    });
  });
});

router.get('/:id', (req, res) => {
  Wrestler.get(req.params.id).then((data) => {
    res.render('wrestlerinfo', {
      data,
      title: 'Sumo Info'
    });
  });
});

module.exports = router;
