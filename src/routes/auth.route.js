const router = require('express').Router();
const jwt = require('jsonwebtoken');
const AuthMiddleware = require('../middlewares/auth.middlewares');

router.post('/api/login', (req, res, next) => {
  const user = {
    id: 1,
    name: 'Yurii',
    email: 'dyakivyur@gmail.com',
    password: 'superpassword'
  };

  const ourToken = jwt.sign({ name: user.name, email: user.email }, 'secret', {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60
  });
  console.log(ourToken);
  res.status(200).json(`Response got`);
});

router.post('/api/login/:id', AuthMiddleware.verifyToken, (req, res, next) => {
  res.status(200).json({ message: 'Testing verify' });
});

module.exports = router;
