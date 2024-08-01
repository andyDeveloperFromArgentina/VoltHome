const service = require('../../services/portfolioService');
const dbTransactions = require('../../infrastructure/database/getTransactions');

jest.mock('../../infrastructure/database/getTransactions');


describe('portfolioBTC', () => {
  it('should return zeo values when there are no transactions', async () => {
    dbTransactions.getAllTransactions.mockResolvedValue([]);

    const result = await service.portfolioBTC();

    expect(result.totalBTC === 0);
    
  });

  it('should return values when there are no transactions', async () => {
    const transactions = [
        { type: 'Buy', cant: 2, amount: 1000, price: 2000 },
        { type: 'Buy', cant: 1, amount: 500, price: 500 },
        { type: 'Sell', cant: 1, amount: 600, price: 600 }
      ];

    dbTransactions.getAllTransactions.mockResolvedValue(transactions);

    const result = await service.portfolioBTC();

    expect(result.totalBTC === 2);
    
  });
});