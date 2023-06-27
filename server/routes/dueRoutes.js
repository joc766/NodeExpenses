const express = require('express');
const { getDue, payDue, unpayDue } = require('../models/dueModel');
const { withErrorHandling } = require('./utils')

const router = express.Router()

router.put('/pay/:expenseID/:userID', withErrorHandling(async (req, res) => {
    const {expenseID, userID} = req.params;
    if (!await getDue(expenseID, userID)) {
        return res.status(404).send('Due does not exist');
    }
    const result = await payDue(expenseID, userID);
    return res.status(200).send('OK');
}, 'PUT /dues/pay'));

router.put('/unpay/:expenseID/:userID', withErrorHandling(async (req, res) => {
    const {expenseID, userID} = req.params;
    if (!await getDue(expenseID, userID)) {
        return res.status(404).send('Due does not exist');
    }
    const result = await unpayDue(expenseID, userID);
    return res.status(200).send('OK');
}, 'PUT /dues/unpay'));


module.exports = router