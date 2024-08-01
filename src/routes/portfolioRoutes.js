const express = require('express');
const controller = require("../controllers/portfolioController");
const router = express.Router();

router.get("/", controller.portfolioBTC);
module.exports = router;