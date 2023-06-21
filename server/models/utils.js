const pool = require('../config/db');

async function getClient(cnxn) {
    if (!cnxn) {
        const client = await pool.connect();
        return client;
    } 
    return cnxn;
}

function closeClient(client) {
    if (client) {
        client.release();
    }
    return
}

async function makeTransaction(client, query, values) {
    try {
        var result = await client.query(query, values);
        await client.query('COMMIT');
    }
    catch (err) {
        console.log(err);
        await client.query('ROLLBACK');
        throw err;
    }
    return result;
}

module.exports = {
    getClient,
    closeClient,
    makeTransaction
};