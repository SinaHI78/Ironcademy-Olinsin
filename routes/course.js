'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const Course = require('./../models/course');
const Enroll = require('./../models/enroll');
const Like = require('./../models/likes');
const routeGuard = require('../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');

const router = new Router();

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

// POST - '/course/:id/enroll' - Handles course enrollment requests for authenticated users. Display successful enrollment message.
router.post('/course/:id/enroll', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Enroll.findOne({ courseId: id, userId: req.user._id })
    .then((enroll) => {
      console.log(enroll);
      if (enroll) {
        throw new Error('USER_CANNOT_ENROLL_IN_COURSE_TWICE');
      } else {
        return Enroll.create({ userId: req.user._id, courseId: id });
      }
    })
    .then((enroll) => {
      if (!enroll) {
        throw new Error('COURSE_NOT_FOUND');
      } else {
        Course.findById(id)
          .populate('creator')
          .then((course) => {
            res.render('single-course', { course });
          });
      }
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/course/:id/unenroll' - Handles deletion of user in specific course
router.post('/course/:id/unenroll', routeGuard, (req, res, next) => {
  const { id } = req.params;
  console.log('This is the id:', id);
  Enroll.findOneAndDelete({ userId: req.user._id, courseId: id })
    .then(() => {
      res.redirect('/authentication/private');
    })
    .catch((error) => {
      next(error);
    });
});

//  GET - '/course-create' - Displays the course creation page (🦆Oliver)
router.get('/course-create', routeGuard, (req, res, next) => {
  res.render('course-create');
});

//  POST - '/course-create' - Handles new course creation / Redirect to Profile page (🦆Oliver)
router.post(
  '/course-create',
  routeGuard,
  fileUpload.single('picture'),
  (req, res, next) => {
    const { title, cost, schedule, description } = req.body;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    Course.create({
      title,
      description,
      cost,
      picture,
      schedule,
      creator: req.user._id
    })
      .then((course) => {
        res.redirect('/authentication/private');
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
);

//  POST - 'course/:id/like' - Handles course likes (🦆Oliver)

router.post('/course/:id/like', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Like.findOne({ course: id, user: req.user._id })
    .then((like) => {
      if (like) {
        throw new Error('USER_CANNOT_LIKE_COURSE_TWICE');
      } else {
        return Like.create({ course: id, user: req.user._id });
      }
    })
    .then(() => {
      return Like.count({ course: id });
    })
    .then((likeCounter) => {
      console.log(likeCounter);
      return Course.findByIdAndUpdate(id, { likeCounter });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

//  POST - 'course/:id/like' - Handles course unlikes (🦆Oliver)

router.post('/course/:id/unlike', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Like.findOneAndDelete({ course: id, user: req.user._id })
    .then(() => {
      return Like.count({ course: id });
    })
    .then((likeCounter) => {
      console.log(likeCounter);
      return Course.findByIdAndUpdate(id, { likeCounter });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
