const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    postTitle: {
      type: String,
      required: [true, 'Please add post title']
    },
    postBody: {
      type: String,
      required: [true, 'Please add post body']
    },
    genre: {
      type: String,
      enum: ['fiction', 'tech', 'business', 'sports', 'others'],
      default: 'others'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please add author id']
    },
    duration: {
      type: Number
    }
  },
  { timestamps: true }
);

PostSchema.pre('save', function (next) {
  this.duration = this.postBody.split(' ').length / 20;
  next();
});

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

module.exports = mongoose.model('Post', PostSchema);
