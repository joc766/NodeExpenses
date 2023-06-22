const pool = require('../config/db');

async function makeTransaction(query, values) {
    try {
        var result = await pool.query(query, values);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    return result;
}


module.exports = {
    makeTransaction,
};