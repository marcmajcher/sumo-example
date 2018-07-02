'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const Wrestler = require('../models/wrestler');

router.get('/', (req, res) => {
  Wrestler.list.then((data) => {
    res.send(data);
  });
});

module.exports = router;
