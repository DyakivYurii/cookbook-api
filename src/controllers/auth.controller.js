const AuthUserModel = require('../models/auth.model');
const AuthUserService = require('../services/auth.service');
const { hashingPassword, createToken } = require('../utils');

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
        return { id: result[0].id, email: result[0].email };
      } else {
        return res
          .status(403)
          .json({ status: 403, message: 'Something was wrote wrong' });
      }
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: 'DB error' });
    });

  const token = createToken(userFromDB);

  res.status(200).json({ status: 200, data: token, message: 'Signed In' });
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
