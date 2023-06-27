const pool = require('../config/db');
const { makeTransaction } = require('./utils');

async function searchUsers(q) {
    const query = `SELECT * FROM "Users" WHERE "user_name" LIKE $1 OR email LIKE $1 OR venmo LIKE $1;`;
    const values = [ `${q}%` ];
    const result = await makeTransaction(query, values);
    return result.rows;
}

async function searchExpenses(q) {
    const query = `SELECT * FROM "Expenses" WHERE "title" LIKE $1;`;
    const values = [ `${q}%` ];
    const result = await makeTransaction(query, values);
    return result.rows;

}

async function searchGroups(q) {
    const query = `SELECT * FROM "Groups" WHERE "group_name" LIKE $1;`;
    const values = [ `${q}%` ];
    const result = await makeTransaction(query, values);
    return result.rows;
}


module.exports = {
    searchUsers,
    searchExpenses,
    searchGroups
}