const UserModel = require('../models/user.model');
const UserService = require('../services/user.service');

const getUsers = (req, res, db) => {
  UserService.getUsers(db)
    .then((items) => {
      if (items.length) {
        res.status(200).json({
          status: 200,
          items,
          message: 'Users succesfully retrived'
        });
      } else {
        res.json({ dataExists: 'false' });
      }
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: error.message });
    });
};

const postUser = (req, res, db) => {
  // first find a user with identical email
  const { error } = UserModel.validateUser(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: 400, message: 'Error with validitaion' });
  }
  console.log(validatedUser);
  // than validate a schema

  // thang create a use

  // and return this user in response method

  res.status(200).send(`Everything is good`);
  // UserService.postUser(id, db)
};

const getUser = (req, res) => {};

const putUser = (req, res) => {};

const deleteUser = (req, res) => {};

module.exports = {
  getUsers,
  postUser,
  getUser,
  putUser,
  deleteUser
};
