const router = require('express').Router();
import UserController from '../controller/UserController';

router.post('/create', UserController.createUser);

router.get('/getUsers', UserController.getUsers);

router.get('/:id', UserController.getSingleUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

module.exports = router;
