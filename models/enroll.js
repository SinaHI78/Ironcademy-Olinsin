'use strict';

const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: 'Course'
  }
});

const Enroll = mongoose.model('Enroll', enrollSchema);

module.exports = Enroll;
