const request = require('supertest');
const { startServer, stopServer } = require('../app'); // Import the startServer and stopServer functions
const mockUsers = require('../models/__mocks__/mockUsers.json');
const mockDueExpenses = require('../models/__mocks__/mockDueExpenses.json');
const mockUserGroups = require('../models/__mocks__/mockUserGroups.json');

jest.mock('../models/userModel'); // Mock the userModel module

describe('User Routes', () => {
  let server;
  beforeAll(() => {
    server = startServer(); // Start the server before running the tests
  });

  afterAll(() => {
    stopServer(); // Stop the server after the tests are completed
  });

  // GET /user/:id
  it('GET /user/:id -- should return a user object', async () => {
    const response = await request(server).get('/user/1');
    expect(response.status).toBe(200);
    const expectedUser = mockUsers[0];
    expect(response.body).toEqual(expectedUser);
  });

  it('GET /user/:id -- should return a 404 error if the user is not found', async () => {
    const response = await request(server).get('/user/10');
    expect(response.status).toBe(404);
    expect(response.text).toBe('User not found');
  });

  // GET /user/:id/expenses
  it('GET /user/:id/expenses -- should return a list of expenses for a user', async () => {
    const response = await request(server).get('/user/1/expenses');
    expect(response.status).toBe(200);
    const expectedExpenses = mockDueExpenses.filter(expense => expense.userID === 1);
    expect(response.body).toEqual(expectedExpenses);
  });

  it('GET /user/:id/expenses?unpaidOnly=true -- should return a list of paid expenses for a user', async () => {
    const response = await request(server).get('/user/1/expenses?unpaidOnly=true');
    expect(response.status).toBe(200);
    const expectedExpenses = mockDueExpenses.filter(expense => {expense.userID === 1 && expense.paid === false;});
    expect(response.body).toEqual(expectedExpenses);
  });

  it('GET /user/:id/expenses?unpaidOnly=false -- should return a list of unpaid expenses for a user', async () => {
    const response = await request(server).get('/user/1/expenses?unpaidOnly=true');
    expect(response.status).toBe(200);
    const expectedExpenses = mockDueExpenses.filter(expense => {expense.userID === 1 && expense.paid === true;});
    expect(response.body).toEqual(expectedExpenses);
  });

  it('GET /user/:id/expenses -- should return a 404 error if the user is not found', async () => {
    const response = await request(server).get('/user/10/expenses');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Client Error: User does not exist or has no expenses');
  });

  // GET /user/:id/groups
  it('GET /user/:id/groups -- should return a list of groups for a user', async () => {
    const response = await request(server).get('/user/1/groups');
    expect(response.status).toBe(200);
    const expectedGroups = mockUserGroups.filter(group => group.userID === 1);
    expect(response.body).toEqual(expectedGroups);
  });

  it('GET /user/:id/groups -- should return a 404 error if the user is not found', async () => {
    const response = await request(server).get('/user/10/groups');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Client Error: User does not exist or has no groups');
  });

  // GET /user/:id/debt
  it('GET /user/:id/debt -- should return a user\'s debt', async () => {
    const response = await request(server).get('/user/1/debt');
    expect(response.status).toBe(200);
    const expectedUnpaid = mockDueExpenses.filter(expense => expense.userID === 1 && expense.paid === false);
    const expectedDebt = expectedUnpaid.reduce((total, expense) => total + expense.amount, 0);
    expect(response.body.debt).toEqual(expectedDebt);
  });

  it('GET /user/:id/debt -- should return a 404 error if the user is not found', async () => {
    const response = await request(server).get('/user/10/debt');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Client Error: User does not exist or has no debt');
  });

  it('GET /user/:id/debt?debtor=:debtor -- should return a user\'s debt to the given debtor', async () => {
    const response = await request(server).get('/user/1/debt?debtor=2');
    expect(response.status).toBe(200);
    var expectedUnpaid = mockDueExpenses.filter(expense => expense.userID == 1 && expense.paid === false && expense.who_paid == 2);
    const expectedDebt = expectedUnpaid.reduce((total, expense) => total + expense.amount, 0);
    expect(response.body.debt).toEqual(expectedDebt);
  });

  it('PUT /user/:id/payAll/:debtorID -- should have a successful response', async () => {
    const response = await request(server).put('/user/1/payAll/2');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });

  it('POST /user -- Good request should have a successful response', async () => {
    const payload = mockUsers[0];
    const response = await request(server).post('/user')
      .send(payload)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(payload);
  });

  it('POST /user -- Bad request should have a 400 error', async () => {
    const response = await request(server).post('/user').send({});
    expect(response.status).toBe(400);
    expect(response.text).toBe('Client Error: Bad Request');
  });
  // NOT TESTING UNTIL FIREBASE IMPLEMENTED
  // it('DELETE /user/:id -- should have a successful response', async () => {
  //   const response = await request(server).delete('/user/1');
  //   expect(response.status).toBe(200);
  //   expect(response.text).toBe('Success');
  // });


  // DELETE /user/:id
  it('DELETE /user/:id -- should have a successful response', async () => {
    const expectedUser = mockUsers[0];
    const response = await request(server).delete(`/user/${expectedUser.userID}`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(expectedUser);
  });
});