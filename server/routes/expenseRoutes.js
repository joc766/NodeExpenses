const express = require('express');
const { getExpense, getExpenseContributors, addExpense, deleteExpense } = require('../models/expenseModel');
const { getGroupUsers } = require('../models/groupModel');
const { withErrorHandling } = require('./utils');
const pool = require('../config/db');


const router = express.Router()

// GET ROUTES

router.get('/:id', withErrorHandling(async (req, res) => {
    const expenseID = req.params.id;
    const expenseInfo = await getExpense(expenseID);
    if (!expenseInfo) {
        return res.status(404).send('Expense does not exist');
    }
    return res.json(expenseInfo);
}));

router.get('/:id/contributors', withErrorHandling(async (req, res) => {
    const expenseID = req.params.id;
    const expenseContributors = await getExpenseContributors(expenseID);
    if (!expenseContributors) {
        return res.status(404).send('Expense does not exist');
    }
    return res.json(expenseContributors);
}));

// POST ROUTES

router.post('/', withErrorHandling(async (req, res) => {
    const { groupID, title, amount, descrip, who_paid, date} = req.body;
    if (!groupID || !title || !amount || !descrip || !who_paid || !date) {
        return res.status(400).send('Missing field');
    }
    const users = await getGroupUsers(groupID);
    const shares = users.reduce((lst, user) => {
        lst.push([user.userID, 1])
        return lst
    }, []);
    const newExpense = addExpense(groupID, title, amount, descrip, who_paid, date, shares);
    return res.status(200).send('OK');
}));

// DELETE ROUTES

router.get('/delete/:id', withErrorHandling(async (req, res) => {
    const expenseID = req.params.id;
    if (!await getExpense(expenseID)) {
        return res.status(400).send('Expense does not exist');
    }
    await deleteExpense(expenseID);
    return res.status(200).send('OK');
}));


module.exports = router