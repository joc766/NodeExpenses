const express = require('express');
const { getGroup, getGroupUsers, getGroupExpenses, addGroup, addGroupUser, deleteGroup, deleteGroupUser } = require('../models/groupModel');
const { getUser, getUserGroups } = require('../models/userModel');
const { withErrorHandling } = require('./utils');

const router = express.Router();

// GET REQUESTS

router.get('/:id', withErrorHandling(async (req, res) => {
    const groupID = req.params.id;
    const group = await getGroup(groupID);
    if (!group) {
        return res.status(404).send('Group not found');
    }
    return res.json(group);
}, 'GET /group/:id'));

router.get('/:id/users', withErrorHandling(async (req, res) => {
    const groupID = req.params.id;
    const groupUsers = await getGroupUsers(groupID);
    if (!groupUsers || groupUsers.length == 0) {
        return res.status(404).send('Group does not exist or has no users');
    }
    return res.json(groupUsers);    
}, 'GET /group/:id/users'));

router.get('/:id/expenses', withErrorHandling(async (req, res) => {
    const groupID = req.params.id;
    const groupXpns = await getGroupExpenses(groupID);
    if (!groupXpns) {
        return res.status(404).send('Group does not exist');
    }
    return res.json(groupXpns);
}, 'GET /group/:id/expenses'));

// POST REQUESTS

// One user will have to create a group, and then other users will get a shareable link to join the group
// If user wants to add members at creation, they can choose their existing name but that will just send an email with link
// Contact through firebase??
router.post('/', withErrorHandling(async (req, res) => {
    const { groupName, initialMembers } = req.body
    if (!groupName) {
        return res.status(400).send('Must supply group name');
    }
    // TODO deal with emailing initialMembers
    const newGroup = await addGroup(groupName);
    return res.status(200).send('OK')
}, 'POST /group'));

router.post('/:id/addUser', withErrorHandling(async (req, res) => {
    const groupID = req.params.id;
    const { userID } = req.body;
    const userCheck = await getUser(userID);
    const groupCheck = await getGroup(groupID);
    if (!userCheck || !groupCheck) {
        return res.status(404).send('User or group specified by ID does not exist');
    }
    const userGroups = await getUserGroups(userID);
    const duplicateCheck = userGroups.find(group => group.groupID == groupID);
    if (duplicateCheck) {
        return res.status(409).send(`User is already a member of that group`);
    }
    const userGroup = await addGroupUser(groupID, userID);
    return res.status(200).send('OK');
}, 'POST /group/:id/addUser'));

// DELETE ROUTES

router.delete('/:id', withErrorHandling(async (req, res) => {
    const groupID = req.params.id;
    if (!getGroup(groupID)) {
        return res.status(400).send('Group does not exist');
    }
    const result = await deleteGroup(groupID);
    return res.status(200).send('OK');
}, 'DELETE /group/:id'));

router.delete('/:groupID/removeUser/:userID', withErrorHandling(async (req, res) => {
    const { groupID, userID } = req.params;
    if (!getGroup(groupID)) {
        return res.status(400).send('Group does not exist');
    }
    if (!getUser(userID)) {
        return res.status(400).send('User is not a member of that group');
    }
    const result = await deleteGroupUser(groupID, userID);
    return res.status(200).send('OK');
}, 'DELETE /group/:groupID/removeUser/:userID'));


module.exports = router
