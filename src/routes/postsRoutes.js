const router = require('express').Router();

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controller/PostsController');
const { authenticate } = require('../middleware/auth');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;
