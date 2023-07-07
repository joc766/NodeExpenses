const { Pool } = require('pg');

const pool = new Pool({
  user: 'jackoconnor',
  host: 'db',
  database: 'expenses',
  password: 'password',
  port: 5432,
});

module.exports = pool;
