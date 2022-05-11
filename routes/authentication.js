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
        req.session.userId = user._id;
        res.redirect('/');
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
        res.redirect('/');
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
        .populate({ path: 'courseId', populate: { path: 'creator' } })
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

//  POST - '/private'
router.post(
  '/private',
  routeGuard,
  fileUpload.single('picture'),
  (req, res, next) => {
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    User.findByIdAndUpdate(req.user._id, {
      picture
    })
      .then((user) => {
        res.redirect('/authentication/private');
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
);

router.get('/sign-out', routeGuard, (req, res, next) => {
  req.session.destroy();
  req.user = undefined;
  res.redirect('/');
});

/*router.delete('/sign-out', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.send('Logout successful');
      }
    });
  } else {
    res.end();
  }
});*/

module.exports = router;
