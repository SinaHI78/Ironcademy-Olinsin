'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');
const Course = require('./../models/course');
const Enroll = require('./../models/enroll');

// Renders home page (🦆Oliver)
router.get('/', (req, res, next) => {
  Course.find()
    .sort({ createdAt: -1 })
    .then((courses) => {
      res.render('home', { courses });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
