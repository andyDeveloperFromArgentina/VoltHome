const express = require('express');
const buyRoute = require('./src/routes/buyRoutes');
const sellRoute = require('./src/routes/sellRoutes');
const portfolioRoute = require('./src/routes/portfolioRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/buy', buyRoute);
app.use('/api/sell', sellRoute);
app.use('/api/portfolio', portfolioRoute);

app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
