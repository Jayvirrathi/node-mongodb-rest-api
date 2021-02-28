const router = require('express').Router();
const {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment
} = require('../controller/CommentsController');
const { authenticate } = require('../middleware/auth');

router.get('/', getComments);
router.get('/:id', getComment);
router.post('/', authenticate, addComment);
router.put('/:id', authenticate, updateComment);
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
