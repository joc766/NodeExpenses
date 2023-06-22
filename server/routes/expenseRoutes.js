const express = require('express');
const { getExpense, getExpenseContributors, addExpense, deleteExpense } = require('../models/expenseModel');
const { withErrorHandling } = require('./utils');


const router = express.Router()

// GET ROUTES

router.get('/:id', withErrorHandling(async (req, res) => {
    const expenseID = req.params.id;
    const expenseInfo = await getExpense(expenseID);
    if (!expenseInfo) {
        return res.status(404).send('Expense not found');
    }
    return res.json(expenseInfo);
}));

router.get('/:id/contributors', withErrorHandling(async (req, res) => {
    const expenseID = req.params.id;
    const expenseContributors = await getExpenseContributors(expenseID);
    if (!expenseContributors) {
        return res.status(404).send('Expense not found');
    }
    return res.json(expenseContributors);
}));

// POST ROUTES

router.post('/', withErrorHandling(async (req, res) => {
    const { title, amt, descrip, who_paid, n_shares, date} = req.body;
    const newExpense = addExpense(title, amt, descrip, who_paid, n_shares, date);
    if (!newExpense) {
        res.status(500).send('Failed to create new expense');
    }
}));

// DELETE ROUTES

router.delete('/:id', withErrorHandling(async (req, res) => {
    const expenseID = req.params.id;
    await deleteExpense(expenseID);
}));


module.exports = router