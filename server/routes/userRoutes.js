const express = require('express');
const { admin } = require('../config/firebaseAdmin');
const { getUser, getUserExpenses, getUserGroups, getUserDebt, payDebtor, addUser, deleteUser } = require('../models/userModel');

const router = express.Router();

// GET REQUESTS

router.get('/:id', async (req, res) => {
    const userID = req.params.id;
    try {
        const user = await getUser(userID);
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

router.get('/:id/expenses', async (req, res) => {
    const userID = req.params.id;
    const unpaidOnly = req.query.unpaidOnly;
    try {
        const expenses = await getUserExpenses(userID, unpaidOnly);
        if (!expenses) {
            res.status(404).send('Client Error: User does not exist or has no expenses');
        }
        res.json(expenses);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id/groups', async (req, res) => {
    const userID = req.params.id;
    try {
        const groups = await getUserGroups(userID);
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
    const userID = req.params.id;
    try {
        const debt = await getUserDebt(userID);
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

router.get(':id/debt/:debtorID', async (req, res) => {
    const userID = req.params.id;
    const debtorID = req.params.debtorID;
    try {
        const debt = await getUserDebt(userID, debtorID);
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

router.put('/:id/payAll/:debtorID', async (req, res) => {
    // pay all of a user's debts to person X
    const userID = req.params.id;
    const debtorID = req.params.debtorID;

    try {
        await payDebtor(userID, debtorID);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

    res.status(200).send('OK');
});

// POST REQUESTS

router.post('/', async (req, res) => {
    const { userID, email, name, venmo } = req.body
    try {
        const newUser = addUser(userID, email, name, venmo);
        if (!newUser) {
            res.status(500).send('Failed to create new user');
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password, venmo } = req.body;
    try {
      var user = await admin.auth().createUser({
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

// DELETE ROUTES

router.delete('/:id', async (req, res) => {
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