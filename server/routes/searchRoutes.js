const express = require('express');
const { searchUsers, searchExpenses, searchGroups } = require('../models/searchModel.js');
const { withErrorHandling } = require('./utils');

const router = express.Router();

router.get('/users', withErrorHandling(async (req, res) => {
    const q = req.query.q;
    const users = await searchUsers(q);
    res.json(users);
}, 'GET /search/users'));

router.get('/expenses', withErrorHandling(async (req, res) => {
    const q = req.query.q;
    const expenses = await searchExpenses(q);
    res.json(expenses);
}, 'GET /search/expenses'));

router.get('/groups', withErrorHandling(async (req, res) => {
    const q = req.query.q;
    const groups = await searchGroups(q);
    res.json(groups);
}, 'GET /search/group'));

module.exports = router;