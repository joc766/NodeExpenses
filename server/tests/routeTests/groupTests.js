const request = require('supertest');
const mockGroups = require('../../models/__mocks__/mockGroups.json');
const mockDueExpenses = require('../../models/__mocks__/mockDueExpenses.json');
const mockUserGroups = require('../../models/__mocks__/mockUserGroups.json');
const mockUsers = require('../../models/__mocks__/mockUsers.json');
const mockExpenses = require('../../models/__mocks__/mockExpenses.json');

const groupTests = (server) => describe('Group Routes', () => {

  // GET /group/:id
  it('GET /group/:id -- should return a group object', async () => {
    const expectedGroup = mockGroups.find(group => group.groupID == 1);
    const response = await request(server).get(`/group/${expectedGroup.groupID}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedGroup);
  });

  // GET /group/:id
  it('GET /group/:id -- should return 404 error if no group exists', async () => {
    const response = await request(server).get(`/group/${10}`);
    expect(response.status).toBe(404);
  });

  // // GET /group/:id/users
  it('GET /group/:id/users -- should return a list of users in a group', async () => {
    const groupID = 1;
    const expectedGroupUsers = mockUserGroups.filter(entry => entry.groupID == groupID);
    let expectedUsers = [];
    for (let i = 0; i < expectedGroupUsers.length; i++) {
      let user = mockUsers.find(user => user.userID == expectedGroupUsers[i].userID);
      expectedUsers.push(user);
    }
    const response = await request(server).get(`/group/${groupID}/users`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedUsers);
  });

  it('GET /group/:id/users -- should return a 404 error if the group is not found', async () => {
    const response = await request(server).get('/group/10/users');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Group does not exist or has no users');
  });

  // GET /group/:id/expenses
  it('GET /group/:id/expenses -- should return a list of expenses for a group', async () => {
    const response = await request(server).get('/group/1/expenses');
    expect(response.status).toBe(200);
    const expectedExpenses = mockExpenses.filter(expense => expense.groupID === 1);
    expect(response.body).toEqual(expectedExpenses);
  });

  it('GET /group/:id/expenses -- should return a 404 error if the group is not found', async () => {
    const response = await request(server).get('/group/10/expenses');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Group does not exist');
  });

  it('POST /group -- should have a successful response', async () => {
    const payload = {
      groupName: "Test Group"
    }
    const response = await request(server).post('/group')
      .send(payload)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
  });

  // POST /group
  it('POST /group -- should have a 400 error for missing groupName', async () => {
    const payload = {}
    const response = await request(server).post('/group')
      .send(payload)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(400);
  });

  // POST /group/:id/addUser
  it('POST /group/:id/addUser -- should have a successful response', async () => {
    const groupID = 2;
    const payload = {
      userID: 1
    }
    const response = await request(server).post(`/group/${groupID}/addUser`)
      .send(payload)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });

  // POST /group/:id/addUser/:userId
  it('POST/group/:id/addUser -- nonexistent group or user should return 404 error', async () => {
    const groupID = 10;
    const payload = {
      userID: 1
    }
    const response = await request(server).post(`/group/${groupID}/addUser`)
      .send(payload)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(404);
    expect(response.text).toBe('User or group specified by ID does not exist');
  });

  // POST /group/:id/addUser/:userId
  it('POST/group/:id/addUser -- duplicate user in group request should return 409 error', async () => {
    const groupID = 1;
    const payload = {
      userID: 1
    }
    const response = await request(server).post(`/group/${groupID}/addUser`)
      .send(payload)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(409);
    expect(response.text).toBe(`User is already a member of that group`);
  });

  // DELETE /group/:id
  it('DELETE /group/:id -- should have a successful response', async () => {
    const response = await request(server).delete(`/group/1`);
    expect(response.status).toBe(200);
  });

  // DELETE /group/:id
  it('DELETE /group/:id/removeUser/:userID -- should have a successful response', async () => {
    const response = await request(server).delete(`/group/1/removeUser/1`);
    expect(response.status).toBe(200);
  });

});

module.exports = groupTests
