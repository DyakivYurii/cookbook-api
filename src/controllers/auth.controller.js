const AuthUserModel = require('../models/auth.model');
const AuthUserService = require('../services/auth.service');
const { hashingPassword, checkPassword, createToken } = require('../utils');

const signIn = async (req, res) => {
  const { error } = AuthUserModel.validateSingInUser(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: 400, message: 'Error with validitaion' });
  }

  const userFromDB = await AuthUserService.getUserByEmail(req.body.email)
    .then((result) => {
      if (result.length) {
        return result[0];
      } else {
        return res
          .status(403)
          .json({ status: 403, message: 'Something was wrote wrong' });
      }
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: 'DB error' });
    });

  checkPassword(req.body.password, userFromDB.password)
    .then((result) => {
      if (result) {
        const token = createToken({
          id: userFromDB.id,
          email: userFromDB.email
        });
        return res
          .status(200)
          .json({ status: 200, data: token, message: 'Signed In' });
      } else {
        return res.status(401).json({ status: 401, message: 'Auth failed' });
      }
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: 'DB error' });
    });
};

const signUp = async (req, res) => {
  const { error } = AuthUserModel.validateSingUpUser(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: 400, message: 'Error with validitaion' });
  }

  const userExistInDB = await AuthUserService.getUserByEmail(req.body.email)
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

  const userInfo = { ...req.body };

  await hashingPassword(userInfo.password)
    .then((result) => {
      userInfo.password = result;
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: 'Problem with password' });
    });

  const createdUser = await AuthUserService.createUser(userInfo)
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
