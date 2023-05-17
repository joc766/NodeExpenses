const pool = require('../config/db');

async function payDue(dueID) {
    // TODO
    // Query: UPDATE Dues SET paid = true WHERE id = dueID;
};

module.exports = {
    payDue
}