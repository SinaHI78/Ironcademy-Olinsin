'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const Course = require('./../models/course');
const Enroll = require('./../models/enroll');
const routeGuard = require('../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');

const router = new Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

const validatePassword = (value) => {
  const numbers = value.match(/[0-9]/);
  const uppercase = value.match(/[A-Z]/);
  const lowercase = value.match(/[a-z]/);
  return lowercase && uppercase && numbers && value.length >= 8;
};

router.post('/sign-up', (req, res, next) => {
  const { name, email, password } = req.body;
  if (validatePassword(password)) {
    bcryptjs
      .hash(password, 10)
      .then((hash) => {
        return User.create({
          name,
          email,
          passwordHashAndSalt: hash
        });
      })
      .then((user) => {
        // req.session.userId = user._id;
        res.redirect('/authentication/sign-in');
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next(new Error('Invalid Password'));
  }
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.redirect('/authentication/private');
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  Course.find({ creator: req.user._id })
    .populate('creator')
    .then((createdCourses) => {
      Enroll.find({ userId: req.user._id })
        .populate('courseId')
        .then((enrollments) => {
          res.render('private', { createdCourses, enrollments });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/course/:id/enroll' - Handles course enrollment requests for authenticated users. Display successful enrollment message.
router.post('/course/:id/enroll', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Enroll.create({
    userId: req.user._id, // req.session.userId
    courseId: id
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

//  GET - '/course/create' - Displays the course creation page (🦆Oliver)
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

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
