const express = require('express');
const { getGroup, getGroupUsers, getGroupExpenses, addGroup, addGroupUser, deleteGroup, deleteGroupUser } = require('../models/groupModel');
const { withErrorHandling } = require('./utils');

const router = express.Router();

// GET REQUESTS

router.get('/:id', withErrorHandling(async (req, res) => {
    const groupID = req.params.id;
    const group = await getGroup(groupID);
    if (!group) {
        return res.status(400).send('Group not found');
    }
    return res.json(group);
}));

router.get('/:id/users', withErrorHandling(async (req, res) => {
    const groupID = req.params.id;
    const groupUsers = await getGroupUsers(groupID);
    if (!groupUsers || groupUsers.length == 0) {
        return res.status(404).send('Group does not exist or has no users');
    }
    return res.json(groupUsers);    
}));

router.get('/:id/expenses', withErrorHandling(async (req, res) => {
    const groupID = req.params.id;
    const groupXpns = await getGroupExpenses(groupID);
    if (!groupXpns) {
        return res.status(404).send('Group does not exist');
    }
    return res.json(groupXpns);
}));

// POST REQUESTS

// One user will have to create a group, and then other users will get a shareable link to join the group
// If user wants to add members at creation, they can choose their existing name but that will just send an email with link
// Contact through firebase??
router.post('/', withErrorHandling(async (req, res) => {
    const { groupName, initialMembers } = req.body
    // TODO deal with emailing initialMembers
    const newGroup = await addGroup(groupName);
    return res.status(200).send('OK')
}));

router.post(':/id/addUser/:userID', withErrorHandling(async (req, res) => {
    const { groupID, userID } = req.params.id
    const userGroup = await addGroupUser(groupID, userID);
    if (!userGroup) {
        console.log('User or group specified by IDs does not exist')
    }
    res.json(userGroup)
}));

// DELETE ROUTES

router.delete(':/id', withErrorHandling(async (req, res) => {
    const groupID = req.params.id;
    const result = await deleteGroup(groupID);
    return res.status(200).send('OK');
}));

router.delete('/:groupID/removeUser/:userID', withErrorHandling(async (req, res) => {
    const { groupID, userID } = req.params;
    const result = await deleteGroupUser(groupID, userID);
    return res.status(200).send('OK');
}));


module.exports = router
