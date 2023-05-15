const express = require('express');
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoutes');

const port = 3000

app.use(express.static(path.join(__dirname, '../client', 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
