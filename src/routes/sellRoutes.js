const express = require('express');
const controller = require("../controllers/sellController");
const router = express.Router();

router.post("/", controller.sellBTC);
module.exports = router;