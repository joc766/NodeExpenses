const express = require('express');
const { admin } = require('../config/firebaseAdmin');
const { getUser, getUserExpenses, getUserGroups, getUserDebt, payDebtor, addUser, deleteUser } = require('../models/userModel');
const {v4: uuidv4 } = require('uuid');

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
            return res.status(404).send('Client Error: User does not exist or has no expenses');
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
            return res.status(404).send('Client Error: User does not exist or has no groups');
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
    const debtorID = req.query.debtor;
    try {
        const debt = await getUserDebt(userID, debtorID);
        if (!debt) {
            return res.status(404).send('Client Error: User does not exist or has no debt');
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

    var { email, name, venmo } = req.body;
    if (!email || !name || !venmo) {
        return res.status(400).send('Client Error: Bad Request');
    }

    try {
        const newUser = await addUser(email, name, venmo);
        if (!newUser) {
            return res.status(500).send('Failed to create new user');
        }
        return res.json(newUser);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Internal Server Error')
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
        return res.status(500).send(err.message);
      }
      else {
        return res.status(400).send(err.message)
      }
    }

    try {
        await addUser(user.email, user.displayName, venmo, user.uid);
        return res.json(user);
    }
    catch (err) {
        console.log('Firebase Admin User Created, but not added to database.')
        console.log(err)
        return res.status(500).send('Internal Server Error');
    }
});

// DELETE ROUTES

router.delete('/:id', async (req, res) => {
    const userID = req.params.id;
    try {
        // COMMENT BACK WHEN WE'RE FULLY USING FIREBASE AUTH
        // await admin.auth().deleteUser(userID); 
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err.message);
    }

    try {
        const user = await deleteUser(userID);
        return res.json(user);
    }
    catch (err) {
        console.log('Firebase Admin User Deleted, but not removed from database.')
        console.log(err)
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;