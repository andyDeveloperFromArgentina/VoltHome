const service = require("../services/portfolioService");

const portfolioBTC = async (req, res) => {
  try {
    const portfolio = await service.portfolioBTC(); 
    res.json(portfolio );
  } catch (error) {
    res.status(500).send('Error reading transactions');
  }
};

module.exports = {
    portfolioBTC,
  };