const pool = require('../config/db');

async function searchUsers(q) {
    // TODO
    // Query: SELECT * FROM Users WHERE name LIKE 'q%' OR email LIKE 'q%' OR venmo LIKE q%;
}

async function searchExpenses(q) {
    // TODO 
    // Query: SELECT * FROM Expenses WHERE title LIKE 'q%' OR description LIKE 'q%';

}

async function searchGroups(q) {
    // TODO
    // Query: SELECT * FROM Groups WHERE name LIKE 'q%';

}


module.exports = {
    searchUsers,
    searchExpenses,
    searchGroups
}