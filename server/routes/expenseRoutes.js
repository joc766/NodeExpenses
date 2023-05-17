const express = require('express');
const { getExpense, getExpenseContributors } = require('../models/expenseModel');


const router = express.Router()

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




module.exports = router