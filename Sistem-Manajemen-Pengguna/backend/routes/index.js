const router = require('express').Router();
const UserController = require('../controller/userController');
const authentication = require('../middleware/authentication');
const errorHandler = require('../middleware/errorHandler');

//login
router.post('/login', UserController.login);

router.use(authentication)

router.get('/users', UserController.getAllUser)

router.get('/users/:id', UserController.getUserById)

router.post('/users', UserController.addUser)

router.put('/users/:id', UserController.updateUser)

router.delete('/users/:id', UserController.deleteUser)

router.use(errorHandler);

module.exports = router;