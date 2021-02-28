const Post = require('../models/Post');
const { tryCatch } = require('../utils/tryCatch');

const APIFeatures = require('../utils/ApiFeature');

exports.getPosts = tryCatch(async (req, res) => {
  const advancedQuery = new APIFeatures(Post.find({}), req.query)
    .sort()
    .paginate()
    .fields()
    .filter();
  const posts = await advancedQuery.query;
  res.status(200).json({ posts });
});

exports.getPost = tryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json({ post });
});

exports.createPost = tryCatch(async (req, res) => {
  const user = req.user._id;
  const { postTitle, postBody, genre } = req.body;
  const post = await Post.create({ postTitle, postBody, genre, user });

  res.status(201).json({
    success: true,
    data: post
  });
});

exports.updatePost = tryCatch(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next({
      message: 'Post not found'
    });
  }

  if (post.user.toString() !== req.user._id) {
    return next({
      message: 'Not authorized to update this post'
    });
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    success: true,
    data: post
  });
});

exports.deletePost = tryCatch(async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next({
      message: 'Post not found'
    });
  }

  if (post.user.toString() !== req.user._id) {
    return next({
      message: 'Not authorized to update this post'
    });
  }

  await post.remove();
  res.status(200).json({
    success: true,
    data: {}
  });
});
