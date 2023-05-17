const express = require('express');
const { getExpense, getExpenseContributors, addExpense, deleteExpense } = require('../models/expenseModel');


const router = express.Router()

// GET ROUTES

router.get('/:id', async (req, res) => {
    const expenseId = req.params.id;
    try {
        const expenseInfo = await getExpense(expenseId);
        if (!expenseInfo) {
            return res.status(404).send('Expense not found');
        }
        res.json(expenseInfo);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
});

router.get('/:id/contributors', async (req, res) => {
    const expenseId = req.params.id;
    try {
        const expenseContributors = await getExpenseContributors(expenseId);
        if (!expenseContributors) {
            return res.status(404).send('Expense not found');
        }
        res.json(expenseContributors);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
});

// POST ROUTES

router.post('/', async (req, res) => {
    const { title, amt, descrip, who_paid, n_shares, date} = req.body;
    try {
        const newExpense = addExpense(title, amt, descrip, who_paid, n_shares, date);
        if (!newExpense) {
            res.status(500).send('Failed to create new expense');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE ROUTES

router.delete('/:id', async (req, res) => {
    const expenseID = req.params.id;
    try {
        await deleteExpense(expenseID);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router