const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const createTransaction = (newTransaction) => {
  const isAlreadyAdded =
  DB.btc_transactions.findIndex((buy) => buy.id === newTransaction.id) > -1;
  
  if (isAlreadyAdded) {
    return;
  }

  DB.btc_transactions.push(newTransaction);
  saveToDatabase(DB);

  return;
};

module.exports = {
  createTransaction
};