const express = require('express');
const router = express.Router();
const { getUserById, getUserTransactions, getUserGroups } = require('../models/userModel');

// GET REQUESTS

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).send('User not found');
        }
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
});

router.get('/:id/transactions', async (req, res) => {
    const userId = req.params.id;
    const unpaidOnly = req.query.unpaidOnly;
    try {
        const transactions = await getUserTransactions(userId, unpaidOnly);
        if (!transactions) {
            res.status(404).send('Client Error: User does not exist or has no transactions');
        }
        res.json(transactions);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id/groups', async (req, res) => {
    const userId = req.params.id;
    try {
        const groups = await getUserGroups(userId);
        if (!groups) {
            res.status(404).send('Client Error: User does not exist or has no groups');
        }
        res.json(groups);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});


// POST REQUESTS
router.post('/create', async (req, res) => {
    const { uuid, name, username } = req.body;
    try {
        const user = await createUser(uuid, name, username);
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;