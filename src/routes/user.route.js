const router = require('express').Router();
const UserController = require('../controllers/user.controller');

// /api/users/
router.route('/').get((req, res) => UserController.getUsers(req, res));

router.route('/user/:id').get((req, res) => UserController.getUser(req, res));

router
  .route('/me')
  .put((req, res) => UserController.putUser(req, res))
  .get((req, res) => UserController.getMe(req, res))
  .delete((req, res) => UserController.deleteUser(req, res));

module.exports = router;
