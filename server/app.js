const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const pool = require('./config/db.js'); // Import the database connection pool
const process = require('process');
const app = express();

let server;


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
app.use(express.json());

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

// Define the shutdown procedure
const handleShutdown = async () => {
  console.log('Shutting down...');
  try {
    // Close the database connection pool
    await pool.end();
    console.log('Database connection pool closed.');

    // Any other cleanup tasks or resource releases can be performed here

    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGINT', handleShutdown);

// Listen for the SIGTERM signal
process.on('SIGTERM', handleShutdown);

// Start the HTTPS server
// const httpsServer = https.createServer(credentials, app);

// Start the server
function startServer() {
  server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  return server;
}

// Stop the server
function stopServer() {
  server.close();
}

// Export the startServer and stopServer functions for testing
module.exports = { startServer, stopServer };

// If the script is being run directly, start the server
if (require.main === module) {
  startServer();
}
