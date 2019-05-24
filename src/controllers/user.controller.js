const UserModel = require('../models/user.model');
const UserService = require('../services/user.service');

const getUsers = (req, res) => {
  UserService.getUsers()
    .then((items) => {
      if (items.length) {
        res.status(200).json({
          status: 200,
          data: items,
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

const getUser = (req, res) => {
  UserService.getUserById(parseInt(req.params.id))
    .then((user) => {
      return res
        .status(200)
        .json({ status: 200, data: user, message: 'User recived' });
    })
    .catch((error) => {
      return res.status(404).json({ status: 404, message: 'User not exist' });
    });
};

const putUser = async (req, res) => {
  const { error } = UserModel.validateUser(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: 400, message: 'Error with validitaion' });
  }

  const userExistInDB = await UserService.getUserById(parseInt(req.params.id))
    .then((result) => {
      if (result.length) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return res.status(400).json({ status: 400, message: 'DB error' });
    });

  if (!userExistInDB) {
    return res.status(404).json({ status: 404, message: 'User not exist' });
  }

  UserService.updateUser(parseInt(req.params.id), req.body)
    .then((response) => {
      return res
        .status(200)
        .json({ status: 200, data: response, message: 'User info updated' });
    })
    .catch((error) => {
      return res.status(400).json({ status: 400, message: 'DB error' });
    });
};

const deleteUser = async (req, res) => {
  const userExistInDB = await UserService.getUserById(parseInt(req.params.id))
    .then((result) => {
      if (result.length) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return res.status(400).json({ status: 400, message: 'DB error' });
    });

  if (!userExistInDB) {
    return res.status(404).json({ status: 404, message: 'User not exist' });
  }

  UserService.deleteUser(parseInt(req.params.id))
    .then((deletedUser) => {
      return res
        .status(200)
        .json({ status: 200, data: deletedUser, message: 'User deleted' });
    })
    .catch((error) => {
      return res.status(400).json({ status: 400, message: 'DB error' });
    });
};

module.exports = {
  getUsers,
  getUser,
  putUser,
  deleteUser
};
