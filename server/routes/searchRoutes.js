const express = require('express');
const { searchUsers, searchExpenses, searchGroups } = require('../models/searchModel.js');

const router = express.Router();

router.get('/users', async (req, res) => {
    const q = req.query.q;
    try {
        const users = await searchUsers(q);
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/expenses', async (req, res) => {
    const q = req.query.q;
    try {
        const users = await searchExpenses(q);
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/groups', async (req, res) => {
    const q = req.query.q;
    try {
        const users = await searchGroups(q);
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;