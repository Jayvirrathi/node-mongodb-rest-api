const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: ['true', 'Please add comment text']
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
