const pg = require('pg');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: true
});

module.exports = db;
