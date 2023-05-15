const express = require('express');
const { getGroup, getGroupUsers, getGroupExpenses, addGroup, addGroupUser } = require('../models/groupModel');

const router = express.Router();

// GET REQUESTS

router.get('/:id', async (req, res) => {
    const groupId = req.params.id;
    try {
        const group = await getGroup(groupId);
        if (!group) {
            return res.status(404).send('Group not found');
        }
        res.json(group);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id/users', async (req, res) => {
    const groupId = req.params.id;
    try {
        const groupUsers = await getGroupUsers(groupId);
        if (!groupUsers) {
            return res.status(404).send('Group does not exist or has no users');
        }
        res.json(groupUsers)
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id/expenses', async (req, res) => {
    const groupId = req.params.id;
    try {
        const groupXpns = await getGroupExpenses(groupId);
        if (!groupXpns) {
            return res.status(404).send('Group does not exist or has no expenses');
        }
        res.json(groupXpns);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})

// POST REQUESTS

// One user will have to create a group, and then other users will get a shareable link to join the group
// If user wants to add members at creation, they can choose their existing name but that will just send an email with link
router.post('/register', async (req, res) => {
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

router.post(':id/addUser/:userId', async (req, res) => {
    const { groupId, userId } = req.params.id
    try {
        const userGroup = await addGroupUser(groupId, userId);
        if (!userGroup) {
            console.log('User or group specified by IDs does not exist')
        }
        res.json(userGroup)
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
});


module.exports = router
