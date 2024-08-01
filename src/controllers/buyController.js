const service = require("../services/buyService");

const buyBTC = async (req, res) => {
  const { body } = req;
  try{
    const transaction = {
      id: body.id,
      cant: body.cant
    };
      
    if (!service.validInput(transaction))
    {
      res.status(400).send('Bad Request');
      return;
    }

    const buyBTC = await service.buyBTC(transaction);
    res.status(201).send({ status: "OK", data: buyBTC });
  }
  catch (error) {
    res.status(500).send('Error processing transactions' + error);
  }
};

 module.exports = {
    buyBTC,
 };