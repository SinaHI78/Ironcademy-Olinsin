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
  Course.find()
    .sort({ likeCounter: -1 })
    .then((courseDocuments) => {
      const ids = courseDocuments.map((course) => course._id);
      if (!req.user) {
        res.render('home', { courses: courseDocuments });
      } else {
        Like.find({ course: { $in: ids }, user: req.user._id }).then(
          (likes) => {
            const mappedCourses = courseDocuments.map((course) => {
              const liked = likes.some((like) => {
                return String(like.course) === String(course._id);
              });
              return { ...course.toJSON(), liked };
            });

            res.render('home', { courses: mappedCourses });
          }
        );
      }
    })
    .catch((error) => {
      next(error);
    });
});

/*router.get('/', (req, res, next) => {
  let courses;
  Course.find()
    .sort({ likeCounter: -1 })
    .then((courseDocuments) => {
      courses = courseDocuments;
      if (!req.user) {
        res.render('home', { courses });
        //res.redirect('/');
      }
      const ids = courses.map((course) => course._id);
      Like.find({ course: { $in: ids }, user: req.user._id }).then((likes) => {
        console.log(likes);
        const mappedCourses = courses.map((course) => {
          const liked = likes.some((like) => {
            return String(like.course) === String(course._id);
          });
          return { ...course.toJSON(), liked };
        });
        res.render('home', { courses: mappedCourses });
      });
    })
    .catch((error) => {
      next(error);
    });
}); */

module.exports = router;
