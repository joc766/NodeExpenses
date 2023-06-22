const express = require('express');
const { searchUsers, searchExpenses, searchGroups } = require('../models/searchModel.js');
const { withErrorHandling } = require('./utils');

const router = express.Router();

router.get('/users', withErrorHandling(async (req, res) => {
    const q = req.query.q;
    const users = await searchUsers(q);
    res.json(users);
}));

router.get('/expenses', withErrorHandling(async (req, res) => {
    const q = req.query.q;
    const users = await searchExpenses(q);
    res.json(users);
}));

router.get('/groups', withErrorHandling(async (req, res) => {
    const q = req.query.q;
    const users = await searchGroups(q);
    res.json(users);
}));

module.exports = router;