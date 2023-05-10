const pool = require('../config/db.js');

async function getUserById(userId) {
  const result = await pool.query('SELECT * FROM Users WHERE id = $1', [userId]);
  userInfo = result.rows[0];
  return userInfo;
}
  
module.exports = {
  getUserById,
};
  