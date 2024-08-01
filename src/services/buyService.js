const dbTransaction = require("../infrastructure/database/createTransaction");
const externalService = require("../infrastructure/externalServices/coinPricesService");
const helper = require("./helper");

  const validInput = (transaction) => {
    if (!helper.isNumeric(transaction.cant)) {
      return false;
    }
    
    return true;
  };

  const buyBTC = async(transaction) => {
    let price = await externalService.getbtcPrice();

    if (price === undefined || price < 0) {
      throw new Error('Error getting Bitcoin price');
    }
    
    const transactionToInsert = {
      id: transaction.id,
      type: 'Buy',
      cant: transaction.cant,
      price: price, 
      amount: price * transaction.cant, 
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
    };

    return await dbTransaction.createTransaction(transactionToInsert);
  };

  module.exports = {
    validInput,
    buyBTC,
  };