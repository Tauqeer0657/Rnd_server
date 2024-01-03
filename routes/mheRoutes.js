// routes/mheRoutes.js
const express = require('express');
const router = express.Router();
const mheController = require('../controller/mheController');


router.post('/', mheController.addMheData);

router.get('/', mheController.getMheData);


module.exports = router;