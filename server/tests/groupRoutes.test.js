const request = require('supertest');
const { startServer, stopServer } = require('../app'); // Import the startServer and stopServer functions
const mockGroups = require('../models/__mocks__/mockGroups.json');
const mockDueExpenses = require('../models/__mocks__/mockDueExpenses.json');
const mockUserGroups = require('../models/__mocks__/mockUserGroups.json');

jest.mock('../models/groupModel'); // Mock the groupModel module

describe('Group Routes', () => {
  let server;
  beforeAll(() => {
    server = startServer(); // Start the server before running the tests
  });

  afterAll(() => {
    return stopServer(); // Stop the server after the tests are completed
  });

  // GET /groups/:id
  it('GET /groups/:id -- should return a group object', async () => {
    const expectedGroup = mockGroups.find(group => group.groupID == 1);
    console.log(expectedGroup);
    const response = await request(server).get(`/groups/${expectedGroup.groupID}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedGroup);
  });

  // it('GET /groups/:id -- should return a 404 error if the group is not found', async () => {
  //   const response = await request(server).get('/groups/10');
  //   expect(response.status).toBe(404);
  //   expect(response.text).toBe('Group not found');
  // });

  // // GET /groups/:id/users
  // it('GET /groups/:id/users -- should return a list of users in a group', async () => {
  //   const response = await request(server).get('/groups/1/users');
  //   expect(response.status).toBe(200);
  //   const expectedUsers = mockGroupUsers.filter(user => user.groupID === 1);
  //   expect(response.body).toEqual(expectedUsers);
  // });

  // it('GET /groups/:id/users -- should return a 404 error if the group is not found', async () => {
  //   const response = await request(server).get('/groups/10/users');
  //   expect(response.status).toBe(404);
  //   expect(response.text).toBe('Group does not exist or has no users');
  // });

  // // GET /groups/:id/expenses
  // it('GET /groups/:id/expenses -- should return a list of expenses for a group', async () => {
  //   const response = await request(server).get('/groups/1/expenses');
  //   expect(response.status).toBe(200);
  //   const expectedExpenses = mockGroupExpenses.filter(expense => expense.groupID === 1);
  //   expect(response.body).toEqual(expectedExpenses);
  // });

  // it('GET /groups/:id/expenses -- should return a 404 error if the group is not found', async () => {
  //   const response = await request(server).get('/groups/10/expenses');
  //   expect(response.status).toBe(404);
  //   expect(response.text).toBe('Group does not exist or has no expenses');
  // });

  // // POST /groups
  // it('POST /groups -- should have a successful response', async () => {
  //   const payload = mockGroups[0];
  //   const response = await request(server).post('/groups')
  //     .send(payload)
  //     .set('Accept', 'application/json')
  //     .set('Content-Type', 'application/json');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(payload);
  // });

  // // POST /groups/:id/addUser/:userId
  // it('POST /groups/:id/addUser/:userId -- should have a successful response', async () => {
  //   const groupID = 1;
  //   const userID = 1;
  //   const response = await request(server).post(`/groups/${groupID}/addUser/${userID}`);
  //   expect(response.status).toBe(200);
  //   expect(response.text).toBe('OK');
  // });

  // // DELETE /groups/:id
  // it('DELETE /groups/:id -- should have a successful response', async () => {
  //   const expectedGroup = mockGroups[0];
  //   const response = await request(server).delete(`/groups/${expectedGroup.groupID}`);
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(expectedGroup);
  //   });
});
