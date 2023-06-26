const { startServer, stopServer } = require('../app');

const userTests = require('./routeTests/userTests');
const groupTests = require('./routeTests/groupTests');
const expenseTests = require('./routeTests/expenseTests');

jest.mock('../models/userModel'); // Mock the userModel module
jest.mock('../models/groupModel'); // Mock the groupModel module
jest.mock('../models/expenseModel'); // Mock the expenseModel module

let server;

afterAll(async () => {
    await stopServer(server); // Stop the server after the tests are completed
    return
});

describe('Sequentially run tests', () => {

    server = startServer();

    userTests(server);
    groupTests(server);
    expenseTests(server);
})
