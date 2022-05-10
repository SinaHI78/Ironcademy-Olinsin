'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHashAndSalt: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: '/images/profile-default-picture.svg'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
