const express = require('express');
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoutes');
const admin = require('firebase-admin');
const credentials = require('./config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const port = 3000

app.use(express.static(path.join(__dirname, '../client', 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/signup', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.post('/signup', async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  try {
    const user = await admin.auth().createUser({
      username: username, 
      email: email,
      password: password
    });

    response = res.json(user);
    // TODO: create a new user in the database with uid and email

  }
  catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error');
  }
});

app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
