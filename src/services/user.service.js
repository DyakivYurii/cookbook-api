// In this file we are creating request to a DB
// returning an object or throw an error

const getUsers = async () => {
  try {
    // here should be retriving users from a db
    // const users = await users.find();
    const users = '';
    return users;
  } catch (error) {
    throw Error('Error while retrieve users');
  }
};

module.exports = {
  getUsers
};