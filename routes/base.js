'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');
const Course = require('./../models/course');
const Enroll = require('./../models/enroll');
const Like = require('../models/likes');

// Renders home page (🦆Oliver)
router.get('/', (req, res, next) => {
  let courses;
  Course.find()
    .sort({ createdAt: -1 })
    .then((courseDocuments) => {
      courses = courseDocuments;
      if (!req.user) {
        res.render('home', { courses });
      } else {
        const ids = courses.map((course) => course._id);
        return Like.find({ course: { $in: ids }, user: req.user._id });
      }
    })
    .then((likes) => {
      const mappedCourses = courses.map((course) => {
        const liked = likes.some((like) => {
          return String(like.course) === String(course._id);
        });
        return { ...course.toJSON(), liked };
      });
      res.render('home', { courses: mappedCourses });
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
