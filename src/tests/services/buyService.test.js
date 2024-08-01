const service = require('../../services/buyService');
const { wrongInputData, okInputData } = require("./helperData");
const externalService = require('../../infrastructure/externalServices/coinPricesService');
const dbTransaction = require('../../infrastructure/database/createTransaction');

jest.mock('../../infrastructure/externalServices/coinPricesService');
jest.mock('../../infrastructure/database/createTransaction');

test('valid input is wrong', () => {
  expect(service.validInput(wrongInputData)).toBe(false);
});

test('valid input is ok', () => {
    expect(service.validInput(okInputData)).toBe(true);
});

describe('buyBTC', () => {
  it('BuyBTC throw an error when price is less than 0', async () => {
    const transaction = { id: 1, cant: 2 };

    externalService.getbtcPrice.mockResolvedValue(-1);

    await expect(service.buyBTC(transaction)).rejects.toThrow('Error getting Bitcoin price');

    expect(externalService.getbtcPrice).toHaveBeenCalledTimes(1);
    expect(dbTransaction.createTransaction).not.toHaveBeenCalled();
  });

  it('should create a transaction when price is valid', async () => {
    const transaction = { id: 1, cant: 2 };
    const btcPrice = 50000;

    externalService.getbtcPrice.mockResolvedValue(btcPrice);
    dbTransaction.createTransaction.mockResolvedValue({ ...transaction, price: btcPrice });

    const result = await service.buyBTC(transaction);

    expect(result.amount === btcPrice * 2);
    });
});