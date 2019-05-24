const router = require('express').Router();
const AuthMiddleware = require('../middlewares/auth.middlewares');

const UserController = require('../controllers/user.controller');

// /api/users/
router.route('/').get((req, res) => UserController.getUsers(req, res));

router
  .route('/:id')
  .get((req, res) => UserController.getUser(req, res))
  .put(AuthMiddleware.verifyToken, (req, res) =>
    UserController.putUser(req, res)
  )
  // Here shoul do a work
  .delete((req, res) => UserController.deleteUser(req, res));

module.exports = router;
