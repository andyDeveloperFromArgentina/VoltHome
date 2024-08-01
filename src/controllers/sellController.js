const service = require("../services/sellService");

const sellBTC = async (req, res) => {
  const { body } = req;
  try{
    const transaction = {
      id: body.id,
      cant: body.cant
    };
      
    if (!await service.validInput(transaction))
      {
        res.status(400).send('Bad Request');
        return;
      }
      
    const sellBTC = await service.sellBTC(transaction);
    res.status(201).send({ status: "OK", data: sellBTC });
  }
  catch (error) {
    console.log(error);
    res.status(500).send('Error processing transactions');
  }
};
 
  module.exports = {
    sellBTC,
  };