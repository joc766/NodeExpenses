const request = require('supertest');
const mockDueExpenses = require('../../models/__mocks__/mockDueExpenses.json');

const dueTests = (server) => describe('Dues Routes', () => {
    it('PUT /:id/pay -- should return success response', async () => {
        const expenseID = 1;
        const userID = 2;
        const result = await request(server).put(`/dues/pay/${expenseID}/${userID}`);
        expect(result.status).toBe(200);
        expect(result.text).toBe('OK');
    });

    it('PUT /:id/pay -- nonexistent expense should return 404 error', async () => {
        const expenseID = 10;
        const userID = 10;
        const result = await request(server).put(`/dues/pay/${expenseID}/${userID}`);
        expect(result.status).toBe(404);
        expect(result.text).toBe('Due does not exist');
    });

    it('PUT /:id/unpay -- should return a success response', async () => {
        const expenseID = 10;
        const userID = 10;
        const result = await request(server).put(`/dues/unpay/${expenseID}/${userID}`);
        expect(result.status).toBe(404);
        expect(result.text).toBe('Due does not exist');
    });

    it('PUT /:id/unpay -- nonexistent expense should return 404 error', async () => {
        const expenseID = 10;
        const userID = 10;
        const result = await request(server).put(`/dues/unpay/${expenseID}/${userID}`);
        expect(result.status).toBe(404);
        expect(result.text).toBe('Due does not exist');
    });
});

module.exports = dueTests;