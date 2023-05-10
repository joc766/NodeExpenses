const express = require('express');
const router = express.Router();
const { getUserById } = require('../models/userModel');

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).send('User not found');
        }

        res.json(user);

    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
});

module.exports = router;