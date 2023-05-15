const express = require('express');
const { admin } = require('../config/firebaseAdmin');
const { getUserById, getUserTransactions, getUserGroups, addUser, payDebtor, deleteUser } = require('../models/userModel');

const router = express.Router();

// DISPLAY PAGES
router.get('/register', (req, res) => {
    res.render('userRegister', { title: 'User Registration' });
});


// GET REQUESTS

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getUserById(userId);
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
        const transactions = await getUserTransactions(userId, unpaidOnly);
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
        response = res.json(user);
    }
    catch (err) {
        console.log('Firebase Admin User Created, but not added to database.')
        console.log(err)
        res.status(500).send('Internal Server Error');
    }
});

// TODO add permissions to this route
router.post('/delete/:uid', async (req, res) => {
    const uid = req.params.uid;
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