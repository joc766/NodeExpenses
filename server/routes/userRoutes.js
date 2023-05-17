const express = require('express');
const { admin } = require('../config/firebaseAdmin');
const { getUser, getUserExpenses, getUserGroups, getUserDebt, payDebtor, addUser, deleteUser } = require('../models/userModel');

const router = express.Router();

// GET REQUESTS

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getUser(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
});

router.get('/:id/transactions', async (req, res) => {
    const userId = req.params.id;
    const unpaidOnly = req.query.unpaidOnly;
    try {
        const transactions = await getUserExpenses(userId, unpaidOnly);
        if (!transactions) {
            res.status(404).send('Client Error: User does not exist or has no transactions');
        }
        res.json(transactions);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id/groups', async (req, res) => {
    const userId = req.params.id;
    try {
        const groups = await getUserGroups(userId);
        if (!groups) {
            res.status(404).send('Client Error: User does not exist or has no groups');
        }
        res.json(groups);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id/debt', async (req, res) => {
    const userId = req.params.id;
    try {
        const debt = await getUserDebt(userId);
        if (!debt) {
            res.status(404).send('Client Error: User does not exist or has no debt');
        }
        res.json(debt);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get(':id/debt/:debtorId', async (req, res) => {
    const userId = req.params.id;
    const debtorId = req.params.debtorId;
    try {
        const debt = await getUserDebt(userId, debtorId);
        if (!debt) {
            res.status(404).send('Client Error: User does not exist or has no debt');
        }
        res.json(debt);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

// PUT REQUESTS

router.put('/:id/payAll/:debtorId', async (req, res) => {
    // pay all of a user's debts to person X
    const userId = req.params.id;
    const debtorId = req.params.debtorId;

    try {
        await payDebtor(userId, debtorId);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

    res.status(200).send('OK');
})

// router.put('/user/login', async (req, res) => {
//     // use firebase auth to log in
//     const { email, password } = req.body;
//     try {
//         const user = await admin.auth().signInWithEmailAndPassword(email, password);
//         res.json(user);
//     }
//     catch (err) {
//         res.status(400).send(err.message);
//     }
// });

// POST REQUESTS

router.post('/register', async (req, res) => {
    const { name, username, email, password, venmo } = req.body;
    try {
      const user = await admin.auth().createUser({
        email: email,
        password: password,
        displayName: name,
      });
    }
    catch (err) {
      if (err.code === 'auth/internal-error') {
        res.status(500).send(err.message);
      }
      else {
        res.status(400).send(err.message)
      }
    }

    try {
        await addUser(user.uid, user.email, user.displayName, venmo);
        res.json(user);
    }
    catch (err) {
        console.log('Firebase Admin User Created, but not added to database.')
        console.log(err)
        res.status(500).send('Internal Server Error');
    }
});

// TODO add permissions to this route
router.post('/delete/:id', async (req, res) => {
    const uid = req.params.id;
    try {
        await admin.auth().deleteUser(user.uid);
        res.json(user);
    }
    catch (err) {
        res.status(400).send(err.message);
    }

    try {
        await deleteUser(uid);
        res.status(200).send('OK');
    }
    catch (err) {
        console.log('Firebase Admin User Deleted, but not removed from database.')
        console.log(err)
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;