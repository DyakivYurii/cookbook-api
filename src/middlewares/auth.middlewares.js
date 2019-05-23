const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: 'Auth failed' });
  }
};

module.exports = {
  verifyToken
};
