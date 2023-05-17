const express = require('express');
const { payDue } = require('../models/dueModel');

const router = express.Router()

router.put('/:id/pay', async (req, res) => {
    const dueID = req.params.id;
    try {
        const result = await payDue(dueID);
        if (!result) {
            return res.status(404).send('Due not found');
        }
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
});


module.exports = router