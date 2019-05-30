const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');

router.post('/api/signin', (req, res) => AuthController.signIn(req, res));

router.post('/api/signup', (req, res) => AuthController.signUp(req, res));

module.exports = router;
