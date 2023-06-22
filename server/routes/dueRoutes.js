const express = require('express');
const { payDue } = require('../models/dueModel');
const { withErrorHandling } = require('./utils')

const router = express.Router()

router.put('/:id/pay', withErrorHandling(async (req, res) => {
    const dueID = req.params.id;
    const result = await payDue(dueID);
    if (!result) {
        return res.status(404).send('Due not found');
    }
    res.json(result);
}));


module.exports = router