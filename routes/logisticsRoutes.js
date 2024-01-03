// routes/logisticsRoutes.js
const express = require('express');
const router = express.Router();
const logisticController = require('../controller/logisticController');


router.post('/', logisticController.addLogisticsData);

router.get('/', logisticController.getLogisticsData);


module.exports = router;
