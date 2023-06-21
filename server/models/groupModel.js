const { getClient, closeClient, makeTransaction } = require('./utils');
const {v4: uuidv4 } = require('uuid');

async function getGroup(groupID, cnxn=null) {
    const client = await getClient(cnxn);
    const query = `SELECT * FROM "Groups" WHERE "groupID" = $1::int`;
    const values = [ groupID ];
    try {
        const result = await makeTransaction(client, query, values);
        if (result.rows.length == 0) {
            return null;
        }
        groupInfo = result.rows[0];
        return groupInfo;
    }
    catch (err) {
        throw err;
    }
    finally {
        closeClient(client);
    }
};

async function getGroupUsers(groupID, cnxn=null) {
    const client = await getClient(cnxn);
    const query = `SELECT u.* FROM "Users" u NATURAL JOIN "User_Groups" ug WHERE ug."groupID" = $1::int`;
    const values = [ groupID ];
    try {
        const result = await makeTransaction(client, query, values);
        return result.rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        closeClient(client);
    }
};

async function getGroupExpenses(groupID, cnxn=null) {
    const client = await getClient(cnxn);
    const checkQuery = `SELECT * FROM "Groups" WHERE "groupID" = $1::int;`;
    const values = [groupID];
    try {
        try {
            const result = await makeTransaction(client, checkQuery, values);
            if (result.rows.length == 0) {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
        const query = `SELECT e.* FROM "Group_Expenses" g NATURAL JOIN "Expenses" e WHERE "groupID" = $1::int;`;
        try {
            const result = await makeTransaction(client, query, values);
            return result.rows;
        }
        catch (err) {
            throw err;
        }
    }
    catch (err) {
        throw err;
    }
    finally {
        closeClient(client);
    }
};

// TODO double check that groups auto-receive an ID
async function addGroup(name, cnxn=null) {
    // TODO TEMP FIX NOT GOOD
    const client = await getClient(cnxn);
    try {
        const checkQuery = `SELECT MAX("groupID") FROM "Groups";`
        const checkResult = await makeTransaction(client, checkQuery, []);
        const newId = checkResult.rows[0]["max"] + 1;
        const query = `INSERT INTO "Groups" ("groupID", group_name) VALUES ($1::int, $2);`;
        const values = [ newId, name ];
        try {
            const result = await makeTransaction(client, query, values);
            return result.rows[0];
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        closeClient(client);
    }

};

async function addGroupUser(groupID, userID, cnxn=null) {
    // TODO should really be throwing multiple different types of errors here so we can display a message
    // need to learn how to catch specific errors here
    // Query: INSERT INTO User_Groups (groupID, userID) VALUES (:groupID, :userID)
    const client = await getClient(cnxn);
    try {
        const checkQuery1 = `SELECT * FROM "Groups" WHERE "groupID" = $1::int;`;
        const checkQuery2 = `SELECT * FROM "Users" WHERE "userID" = $1::int;`;
        try {
            const result1 = await makeTransaction(client, checkQuery1, [ groupID ]);
            const result2 = await makeTransaction(client, checkQuery2, [ userID ]);
            if (result1.rows.length == 0 || result2.rows.length == 0) {
                throw Error
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }

        const query = `INSERT INTO "User_Groups" ("groupID", "userID") VALUES ($1::int, $2::int);`;
        const values = [ groupID, userID ];
        try {
            const result = await makeTransaction(client, query, values);
            return result
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    catch (err) {
        throw err;
    }
    finally {
        closeClient(client);
    }
};

async function deleteGroup(groupID, cnxn=null) {
    // TODO MAKE SURE THE GROUP EXISTS
    const client = getClient(cnxn);
    try {
        const query = `DELETE FROM "Groups" WHERE "groupID" = $1;`;
        const values = [ groupID ];
        try {
            const result = await makeTransaction(client, query, values);
            return result
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    catch (err) {
        throw err;
    }
    finally {
        closeClient(client);
    }
}

async function deleteGroupUser(groupID, userID, cnxn=null) {
    // TODO MAKE SURE THE USER EXISTS IN THE GROUP
    const client = await getClient(cnxn);
    try {
        const query = `DELETE FROM "User_Groups" WHERE "groupID" = $1 AND "userID" = $2;`;
        const values = [ groupID, userID ];
        try {
            const result = await makeTransaction(client, query, values);
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    catch (err) {
        throw err;
    }
    finally {
        closeClient(client);
    }
}


module.exports = {
    getGroup,
    getGroupUsers,
    getGroupExpenses,
    addGroup,
    addGroupUser,
    deleteGroup,
    deleteGroupUser
}