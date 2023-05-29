const pool = require('../config/db');

async function makeTransaction(query, values) {
    const client = await pool.connect();
    try {
        var result = await client.query(query, values);
        await client.query('COMMIT');
    }
    catch (err) {
        console.log(err);
        await client.query('ROLLBACK');
        throw err;
    }
    finally {
        client.release();
    }
    return result;
}

module.exports = {
    makeTransaction
};