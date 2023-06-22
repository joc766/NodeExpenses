const express = require('express');
const { admin } = require('../config/firebaseAdmin');
const { getUser, getUserExpenses, getUserGroups, getUserDebt, payDebtor, addUser, deleteUser } = require('../models/userModel');
const {v4: uuidv4 } = require('uuid');
const { withErrorHandling } = require('./utils');

const router = express.Router();

// GET REQUESTS

router.get('/:id', withErrorHandling(async (req, res) => {
    const userID = req.params.id;
    const user = await getUser(userID);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
}));

router.get('/:id/expenses', withErrorHandling(async (req, res) => {
    const userID = req.params.id;
    const unpaidOnly = req.query.unpaidOnly;
    const expenses = await getUserExpenses(userID, unpaidOnly);
    if (!expenses) {
        return res.status(404).send('Client Error: User does not exist or has no expenses');
    }
    res.json(expenses);
}));

router.get('/:id/groups', withErrorHandling(async (req, res) => {
    const userID = req.params.id;
    const groups = await getUserGroups(userID);
    if (!groups) {
        return res.status(404).send('Client Error: User does not exist or has no groups');
    }
    res.json(groups);
}));

router.get('/:id/debt', withErrorHandling(async (req, res) => {
    const userID = req.params.id;
    const debtorID = req.query.debtor;
    const debt = await getUserDebt(userID, debtorID);
    if (!debt) {
        return res.status(404).send('Client Error: User does not exist or has no debt');
    }
    res.json(debt);
}));

// PUT REQUESTS

router.put('/:id/payAll/:debtorID', withErrorHandling(async (req, res) => {
    const userID = req.params.id;
    const debtorID = req.params.debtorID;
    await payDebtor(userID, debtorID);
    
    res.status(200).send('OK');
}));

// POST REQUESTS

router.post('/', withErrorHandling(async (req, res) => {
    var { email, name, venmo } = req.body;
    if (!email || !name || !venmo) {
        return res.status(400).send('Client Error: Bad Request');
    }

    const newUser = await addUser(email, name, venmo);
    if (!newUser) {
        return res.status(500).send('Failed to create new user');
    }

    return res.json(newUser);
}));

router.post('/register', withErrorHandling(async (req, res) => {
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
}));

// DELETE ROUTES

router.delete('/:id', withErrorHandling(async (req, res) => {
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
}));

module.exports = router;