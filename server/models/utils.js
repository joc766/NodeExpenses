const pool = require('../config/db');

async function makeTransaction(query, values) {
    try {
        var result = await pool.query(query, values);
    }
    catch (err) {
        const errorMessage = `Caught in makeTransaction:\n\n${err.message}`
        throw new Error(errorMessage);
    }
    return result;
}


module.exports = {
    makeTransaction,
};