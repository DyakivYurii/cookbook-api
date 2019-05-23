const router = require('express').Router();
const jwt = require('jsonwebtoken');
const AuthMiddleware = require('../middlewares/auth.middlewares');
const AuthController = require('../controllers/auth.controller');
const AuthService = require('../services/auth.service');

router.post('/api/signin', (req, res) => AuthController.signIn(req, res));

router.post('/api/login/:id', AuthMiddleware.verifyToken, (req, res, next) => {
  res.status(200).json({ message: 'Testing verify' });
});

router.post('./api/signup', (req, res) => AuthController.signUp(req, res));

module.exports = router;
