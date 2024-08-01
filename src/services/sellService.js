const dbTransaction = require("../infrastructure/database/createTransaction");
const externalService = require("../infrastructure/externalServices/coinPricesService");
const portfolioService = require("./portfolioService");
const helper = require("./helper");

const validInput = async (transaction) => {
  if (!helper.isNumeric(transaction.cant)) {
     return false;
  }
  
  let portfolio = await portfolioService.portfolioBTC();
  let btc = portfolio.totalBTC;

  if (btc < transaction.cant) {
    return false;
  }
  
  return true;
};
  const sellBTC = async(transaction) => {
    let price = await externalService.getbtcPrice();
    
    if (price === undefined || price < 0) {
      throw new Error('Error getting Bitcoin price');
    }
    
    const transactionToInsert = {
      id: transaction.id,
      type: 'Sell',
      cant: transaction.cant,
      price: price, 
      amount: price * transaction.cant, 
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
    };

    return await dbTransaction.createTransaction(transactionToInsert);
  };


  module.exports = {
     validInput,
     sellBTC,
  };