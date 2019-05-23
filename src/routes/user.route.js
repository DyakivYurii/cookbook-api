const router = require('express').Router();

const UserController = require('../controllers/user.controller');

// /api/users/
router
  .route('/')
  .get((req, res) => UserController.getUsers(req, res))
  .post((req, res) => UserController.postUser(req, res));

router
  .route('/:id')
  .get((req, res) => UserController.getUser(req, res))
  .put((req, res) => UserController.putUser(req, res))
  .delete((req, res) => UserController.deleteUser(req, res));

module.exports = router;
