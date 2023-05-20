const { Pool } = require('pg');

const pool = new Pool({
  user: 'jackoconnor',
  host: 'localhost',
  database: 'expenses',
  password: 'password',
  port: 5432,
});

module.exports = pool;
