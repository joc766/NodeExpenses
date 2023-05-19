const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();


const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dueRoutes = require('./routes/dueRoutes');
const searchRoutes = require('./routes/searchRoutes');

const port = 3000

// Read the SSL/TLS certificate and private key files
// const privateKey = fs.readFileSync(path.join(__dirname, 'private-key.pem'), 'utf8');
// const certificate = fs.readFileSync(path.join(__dirname, 'certificate.pem'), 'utf8');
// const credentials = { key: privateKey, cert: certificate };

app.use(express.static(path.join(__dirname, '../client', 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use('/expense', expenseRoutes);
app.use('/dues', dueRoutes);
app.use('/search', searchRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Start the HTTPS server
// const httpsServer = https.createServer(credentials, app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
