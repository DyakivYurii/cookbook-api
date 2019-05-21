// handles logic behing of validating request parameters, query,
// sending response with correct code. like problem code or good code

const db = require('../db');
const UserModel = require('../models/user.model');
const UserService = require('../services/user.service');

const getUsers = (req, res, next) => {
  // here should olso validate query parameters

  // here also will set some page limits
  try {
    const users = await UserService.getUsers();
    return res.status(200).json({
      status: 200,
      data: users,
      message: "Users succesfully retrived"
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const postUser = (req, res) => {

}

const getUser = (req, res) => {

}

const putUser = (req, res) => {

}

const deleteUser = (req, res) => {

}

module.exports = {
  getUsers,
  postUser,
  getUser,
  putUser,
  deleteUser
};