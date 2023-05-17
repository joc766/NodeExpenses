const pool = require('../config/db');

async function payDue(dueId) {
    // TODO
    // Query: UPDATE Dues SET paid = true WHERE id = dueId;
};

module.exports = {
    payDue
}