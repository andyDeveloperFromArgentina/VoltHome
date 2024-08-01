const fs = require("fs");
const source = './src/infrastructure/database/db.json';

const saveToDatabase = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(source, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return reject(err);
        }
        resolve();
    });
  });
};

module.exports = 
{ 
  saveToDatabase
};