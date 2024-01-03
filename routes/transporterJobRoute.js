// routes/transporterJobRoutes.js
const express = require('express');
const router = express.Router();
const transporterJobController = require('../controller/transporterJobController')


router.post('/', transporterJobController.addTransporterJobData);

router.get('/', transporterJobController.getTransporterJobData);

router.patch('/:Transporter_id', transporterJobController.updateTransporterJobData);

router.delete('/:Transporter_id', transporterJobController.deleteTransporterJobData);


module.exports = router;
