const request = require('supertest');
const { startServer, stopServer } = require('../app'); // Import the startServer and stopServer functions
const app = require('../app'); // Import the specific route file
const mockUsers = require('../models/__mocks__/mockUsers.json'); // Import the mock data

jest.mock('../models/userModel'); // Mock the userModel module

describe('User Routes', () => {
  let server;
  beforeAll(() => {
    server = startServer(); // Start the server before running the tests
  });

  afterAll(() => {
    stopServer(); // Stop the server after the tests are completed
  });

  it('should return a list of users', async () => {
    const response = await request(server).get('/user/1');
    expect(response.status).toBe(200);
    const expectedUser = mockUsers[0];
    expect(response.body).toEqual(expectedUser);
  });
});