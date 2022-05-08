const User = require('./../models/user');
const Course = require('./../models/course');
const Enroll = require('./../models/enroll');
const { Router } = require('express');
const router = new Router();
const routeGuard = require('../middleware/route-guard');

//POST - '/course/:id/delete' - Handles course delete requests only for creator/ Refresh Private page(🐝Inger)
//input: use form button on private page
router.post('/course/:id/delete', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Course.findOneAndDelete({ _id: id, creator: req.user._id })
    .then(() => {
      res.redirect('/authentication/private');
    })
    .catch((error) => {
      next(error);
    });
});

//  GET - '/course/:id/edit' - Displays course edit page (we will reuse the course create view)(🐝Inger)
router.get('/course/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Course.findOne({ _id: id, creator: req.user._id })
    .then((course) => {
      if (!course) {
        throw new Error('No course found');
      } else {
        res.render('edit-page', { course });
      }
    })
    .catch((error) => {
      next(error);
    });
});

//  POST - '/course/:id/edit' - Handles updates to existing courses(🐝Inger)
router.post('/course/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Course.findOneAndUpdate({ _id: id, creator: req.user._id })
    .then(() => {
      res.redirect(`/private/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
