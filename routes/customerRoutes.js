// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');


router.post('/', customerController.addCustomerData);

router.get('/', customerController.getCustomerData);

router.patch('/:customerCode', customerController.updateCustomerData);

router.get('/customerCode', customerController.getAllCustomerCode);

router.get('/lastCustomerCode', customerController.getLastCustomerCode);

router.get('/:customerCode', customerController.getSingleCustomerData);

router.delete('/:customerCode', customerController.deleteByCustomerCode);


module.exports = router;














