const axios = require('axios');
const base = 'https://api.coingecko.com/';

const getbtcPrice = async() => {
    try {
        const response = await axios.get(base + 'api/v3/simple/price', {
          params: {
            ids: 'bitcoin',
            vs_currencies: 'usd'
          }
        });

        return response.data.bitcoin.usd;

      } catch (error) {
        console.log(error);
        return -1;
    }
};

module.exports = {
    getbtcPrice,
};