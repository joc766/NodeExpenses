const pool = require('../config/db');

// This model kind of has no reason to add or delete dues as they are created/deleted along with expenses

async function payDue(dueID) {
    // TODO
    // Query: UPDATE Dues SET paid = true WHERE id = dueID;
};

module.exports = {
    payDue
}