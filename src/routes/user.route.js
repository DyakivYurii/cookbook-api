const router = require('express').Router();
const AuthMiddleware = require('../middlewares/auth.middlewares');

const UserController = require('../controllers/user.controller');

// /api/users/
router.route('/').get((req, res) => UserController.getUsers(req, res));

router.route('/:id').get((req, res) => UserController.getUser(req, res));

router.use('/api/users/me', AuthMiddleware.protect);
router
  .route('/me')
  .get((req, res) => UserController.getMe(req, res))
  .put((req, res) => UserController.putUser(req, res))
  .delete((req, res) => UserController.deleteUser(req, res));

module.exports = router;
