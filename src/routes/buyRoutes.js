const express = require('express');
const controller = require("../controllers/buyController");
const router = express.Router();

router.post("/", controller.buyBTC);
module.exports = router;