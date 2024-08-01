const DB = require("./db.json");

const getAllTransactions = () => {
  return DB.btc_transactions;
};

module.exports = {
  getAllTransactions,
};