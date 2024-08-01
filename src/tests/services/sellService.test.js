const service = require('../../services/sellService');
const portfolio = require('../../services/portfolioService');
const { wrongInputData, okInputData } = require("./helperData");
const externalService = require('../../infrastructure/externalServices/coinPricesService');
const dbTransaction = require('../../infrastructure/database/createTransaction');

jest.mock('../../infrastructure/externalServices/coinPricesService');
jest.mock('../../infrastructure/database/createTransaction');
jest.mock('../../services/portfolioService');

test('valid input is wrong', async() => {
  var isValid = await service.validInput(wrongInputData);
  expect(isValid).toBe(false);
});

test('valid input is wrong if try to sell more btc exist in account', async () => {
  let result = { totalBTC: 0};

  portfolio.portfolioBTC.mockResolvedValue(result);
  var isValid = await service.validInput(okInputData);
  expect(isValid).toBe(false);
});

test('valid input is ok', async () => {
  let result = { totalBTC: 10};

  portfolio.portfolioBTC.mockResolvedValue(result);
  var isValid = await service.validInput(okInputData);
  expect(isValid).toBe(true);
});

describe('sellBTC', () => {
  it('BuyBTC throw an error when price is less than 0', async () => {
    const transaction = { id: 1, cant: 2 };

    externalService.getbtcPrice.mockResolvedValue(-1);

    await expect(service.sellBTC(transaction)).rejects.toThrow('Error getting Bitcoin price');

    expect(externalService.getbtcPrice).toHaveBeenCalledTimes(1);
    expect(dbTransaction.createTransaction).not.toHaveBeenCalled();
  });

  it('should create a transaction when price is valid', async () => {
    const transaction = { id: 1, cant: 2 };
    const btcPrice = 50000;

    externalService.getbtcPrice.mockResolvedValue(btcPrice);
    dbTransaction.createTransaction.mockResolvedValue({ ...transaction, price: btcPrice });

    const result = await service.sellBTC(transaction);

    expect(result.amount === btcPrice * 2);
    });
});