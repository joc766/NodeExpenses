const express = require('express');
const { payDue } = require('../models/dueModel');

router.put('/:id/pay', async (req, res) => {
    const dueId = req.params.id;
    try {
        const result = await payDue(dueId);
        if (!result) {
            return res.status(404).send('Due not found');
        }
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
})


const router = express.Router()