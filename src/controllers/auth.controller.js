const AuthUserModel = require('../models/auth.model');

const signIn = (req, res) => {};

const signUp = async (req, res) => {
  const { error } = UserModel.validateUser(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: 400, message: 'Error with validitaion' });
  }

  const userExistInDB = await UserService.getUserByEmail(req.body.email)
    .then((result) => {
      if (result.length) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: 'DB error' });
    });

  if (userExistInDB) {
    return res
      .status(403)
      .json({ status: 403, message: 'Something was wrote wrong' });
  }

  const createdUser = await UserService.createUser(req.body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: 'DB error' });
    });

  return res
    .status(200)
    .json({ status: 200, data: createdUser, message: 'User created' });
};

const protect = (req, res, next) => {};

module.exports = { signIn, signUp, protect };
