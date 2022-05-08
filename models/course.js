'use strict';

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    picture: {
      type: String,
      default: '/images/course-default-picture.svg'
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    schedule: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
