const express = require('express');
const { getGroup, getGroupUsers, getGroupExpenses, addGroup, addGroupUser, deleteGroup, deleteGroupUser } = require('../models/groupModel');

const router = express.Router();

// GET REQUESTS

router.get('/:id', async (req, res) => {
    const groupID = req.params.id;
    try {
        const group = await getGroup(groupID);
        if (!group) {
            return res.status(400).send('Group not found');
        }
        return res.json(group);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/:id/users', async (req, res) => {
    const groupID = req.params.id;
    try {
        const groupUsers = await getGroupUsers(groupID);
        if (!groupUsers || groupUsers.length == 0) {
            return res.status(404).send('Group does not exist or has no users');
        }
        return res.json(groupUsers);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/:id/expenses', async (req, res) => {
    const groupID = req.params.id;
    try {
        const groupXpns = await getGroupExpenses(groupID);
        if (!groupXpns) {
            return res.status(404).send('Group does not exist');
        }
        return res.json(groupXpns);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
})

// POST REQUESTS

// One user will have to create a group, and then other users will get a shareable link to join the group
// If user wants to add members at creation, they can choose their existing name but that will just send an email with link
// Contact through firebase??
router.post('/', async (req, res) => {
    const { groupName, initialMembers } = req.body
    // TODO deal with emailing initialMembers
    try {
        const newGroup = await addGroup(groupName);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post(':/id/addUser/:userID', async (req, res) => {
    const { groupID, userID } = req.params.id
    try {
        const userGroup = await addGroupUser(groupID, userID);
        if (!userGroup) {
            console.log('User or group specified by IDs does not exist')
        }
        res.json(userGroup)
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

// DELETE ROUTES

router.delete(':/id', async (req, res) => {
    const groupID = req.params.id;
    try {
        const result = await deleteGroup(groupID);
        return res.status(200).send('OK');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

router.delete('/:groupID/removeUser/:userID', async (req, res) => {
    const { groupID, userID } = req.params;
    try {
        const result = await deleteGroupUser(groupID, userID);
        console.log(result);
        return res.status(200).send('OK');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});


module.exports = router
