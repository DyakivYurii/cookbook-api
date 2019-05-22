const getUsers = (db) => {
  return db.select('*').from('users');
};

module.exports = {
  getUsers
};
