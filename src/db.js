const pg = require('pg');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'root',
    database: 'cookbook'
  }
});

// db.select('*')
//   .from('users')
//   .then((items) => {
//     console.log('Items', items);
//     if (items.length) {
//       return items;
//     }
//     return { dataExists: false };
//   })
//   .catch((error) => error.detail);

module.exports = db;
