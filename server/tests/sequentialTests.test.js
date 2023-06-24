const { startServer, stopServer } = require('../app');

const userTests = require('./routeTests/userTests');
const groupTests = require('./routeTests/groupTests');

jest.mock('../models/userModel'); // Mock the userModel module
jest.mock('../models/groupModel'); // Mock the userModel module

let server;

afterAll(async () => {
    await stopServer(server); // Stop the server after the tests are completed
    return
});

describe('Sequentially run tests', () => {

    server = startServer();

    userTests(server);
    groupTests(server);
})
