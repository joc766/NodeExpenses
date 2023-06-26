const request = require('supertest');
const mockDueExpenses = require('../../models/__mocks__/mockDueExpenses.json');
const mockUserGroups = require('../../models/__mocks__/mockUserGroups.json');
const mockUsers = require('../../models/__mocks__/mockUsers.json');
const mockExpenses = require('../../models/__mocks__/mockExpenses.json');

const expenseTests = (server) => describe('Expense Routes', () => {

    // GET /expense/:id
    it('GET /expense/:id -- should return an expense object', async () => {
        const id = 1;
        const expectedExpense = mockExpenses.find(expense => expense.expenseID == id);
        const response = await request(server).get(`/expense/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedExpense);
    });

    it('GET /expense/:id -- nonexistent expense should return client error', async () => {
        const id = 10;
        const response = await request(server).get(`/expense/${id}`);
        expect(response.status).toBe(404);
        expect(response.text).toEqual('Expense does not exist');
    });

    // GET /expense/:id/contributors
    it('GET /expense/:id/contributors -- should return a list of expenses', async () => {
        const id = 1;
        const expectedDues = mockDueExpenses.filter(due => due.expenseID == id);
        const expectedUsers = expectedDues.map(due => mockUsers.find(user => user.userID = due.userID))
        const response = await request(server).get(`/expense/${id}/contributors`);
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expectedUsers);
    });

    it('GET /expense/:id/contributors', async () => {
        const id = 10;
        const response = await request(server).get(`/expense/${id}/contributors`);
        expect(response.status).toBe(404);
        expect(response.text).toEqual('Expense does not exist');
    })

    // POST /expense
    it('POST /expense -- should have a success response', async () => {
        const response = await request(server).post(`/expense`)
            .send({
                "title": "Expense 3",
                "amount": 60.50,
                "descrip": "Description 3",
                "who_paid": 3,
                "n_shares": 2,
                "date": "2023-05-03",
                "groupID": 3
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.text).toEqual('OK');
    })

    it('POST /expense -- missing field(s) should return 400 error', async () => {
        const response = await request(server).post(`/expense`)
            .send({})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Missing field');
    });

    // DELETE /expense/:id

    it('DELETE /expense/:id -- should have a success response', async () => {
        const response = await request(server).delete(`/expense/1`);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('OK');
    });

    it('DELETE /expense/:id -- nonexistent expense should return 400 error', async () => {
        const response = await request(server).delete(`/expense/10`);
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Expense does not exist');
    });
})

module.exports = expenseTests