const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  course: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Course'
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
