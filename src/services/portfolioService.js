const dbTransactions = require("../infrastructure/database/getTransactions");

const portfolioBTC = async() => {
    var transactions = await dbTransactions.getAllTransactions();

    let buyTransactions = transactions.filter((item) => {
      return item.type === "Buy"
    });

    let sellTransactions = transactions.filter((item) => {
      return item.type === "Sell"
    });

    let totalBuy = buyTransactions.reduce((total, item) => total + item.cant, 0);
    let totalSell = sellTransactions.reduce((total, item) => total + item.cant, 0);
    let amountOfBuy = buyTransactions.reduce((total, item) => total + item.amount, 0);
    let amountOfSell = sellTransactions.reduce((total, item) => total + item.amount, 0);

    return  {
        totalBTC: totalBuy - totalSell,
        balanceAmount: amountOfBuy  - amountOfSell,
        transaction_Buy: {
          total_transactions: buyTransactions.length,
          total_amount: amountOfBuy,
          total_btc:totalBuy,
        },
        transaction_Sell: {
          total_transactions: sellTransactions.length,
          total_amount: amountOfSell,
          total_btc:totalSell,
        },
      };       
  };

  module.exports = {
    portfolioBTC,
  };