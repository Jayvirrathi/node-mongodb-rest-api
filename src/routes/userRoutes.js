const router = require('express').Router();

const { register, login, getUsers } = require('../controller/UserController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize(['admin']), getUsers);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
