const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { tryCatch } = require('../utils/tryCatch');

exports.getComments = tryCatch(async (req, res, next) => {
  const { postId } = req.body;
  if (!postId) {
    return next({
      message: 'Post id not given'
    });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return next({
      message: 'Post not found'
    });
  }

  const comments = await Comment.find({ post: postId });

  res.status(200).json({
    success: true,
    data: comments
  });
});
exports.getComment = tryCatch(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
    .populate({
      path: 'post',
      select: 'postTitle duration',
      populate: {
        path: 'user',
        select: 'name email'
      }
    })
    .populate({
      path: 'user'
    });

  if (!comment) {
    return next({
      message: 'Comment not found'
    });
  }

  res.status(200).json({
    success: true,
    data: comment
  });
});

exports.addComment = tryCatch(async (req, res, next) => {
  const { postId } = req.body;
  const user = req.user._id;

  const post = await Post.findById(postId);

  if (!post) {
    return next({
      message: 'Post not found'
    });
  }

  const comment = await Comment.create({ ...req.body, user, post: postId });

  res.status(200).json({
    success: true,
    data: comment
  });
});

exports.updateComment = tryCatch(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next({
      message: 'Comment not found'
    });
  }
  if (comment.user.toString() !== req.user._id) {
    return next({
      message: 'Not authorized to update the comment'
    });
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  comment.save();

  res.status(200).json({
    success: true,
    data: comment
  });
});

exports.deleteComment = tryCatch(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next({
      message: 'Comment not found'
    });
  }
  if (comment.user.toString() !== req.user._id) {
    return next({
      message: 'Not authorized to delete the comment'
    });
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
