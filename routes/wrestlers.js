'use strict';

/* eslint-env node */
/* eslint-disable no-use-before-define */

const express = require('express');
const router = express.Router();
const Wrestler = require('../models/wrestler');

router.get('/', sumoIndex);
router.get('/new', newSumo);
router.get('/:id', sumoInfo);

router.post('/', createSumo);


/* Router methods */

function sumoIndex(req, res) {
  Wrestler.list().then((data) => {
    res.render('wrestlers', {
      data,
      title: 'Sumo Wrestlers',
    });
  });
}

function newSumo(req, res) {
  res.render('newwrestler', {
    title: 'Create New Sumo'
  });
}

function sumoInfo(req, res) {
  Wrestler.get(req.params.id).then((data) => {
    res.render('wrestlerinfo', {
      data,
      title: 'Sumo Info'
    });
  });
}

function createSumo(req, res) {
  Wrestler.create(req.body).then(() => {
      res.send({
        redirect: '/wrestler',
        butts: 8201
      });
  });
}

module.exports = router;
