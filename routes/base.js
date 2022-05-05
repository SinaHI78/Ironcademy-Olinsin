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

// Renders Single Course page
router.get('/course/:id', (req, res, next) => {
  const { id } = req.params;
  Course.findById(id)
    .populate('creator')
    .then((course) => {
      let userIsCreator =
        req.user && String(req.user._id) === String(course.creator._id);
      res.render('single-course', { course, userIsCreator });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
