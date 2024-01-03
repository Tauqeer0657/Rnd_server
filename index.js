// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const customerRoutes = require('./routes/customerRoutes');
const jobRoutes = require('./routes/jobRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');
const manPowerRoutes = require('./routes/manPowerRoutes');
const specialPackageRoutes = require('./routes/specialPackageRoutes');
const workOrderRoutes = require('./routes/workOrderRoutes')
const transporterJobRoute = require('./routes/transporterJobRoute')
const vehicleDetailsRoute = require('./routes/vehicleDetailsRoutes')
const mheRoutes = require('./routes/mheRoutes');

const app = express();
const port = process.env.PORT || 3306;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Use customer routes
app.use('/api/customers', customerRoutes);

// Use job routes
app.use('/api/new_jobs', jobRoutes);

// Use logictics routes
app.use('/api/logistics', logisticsRoutes);

//use MHE Routes
app.use('/api/mhe', mheRoutes);

// use manPower routes
app.use('/api/manPower', manPowerRoutes);

// use specialpackage routes
app.use('/api/special', specialPackageRoutes);

//use transporterJobRoutes 
app.use('/api/transporterJob', transporterJobRoute );

//use vehicleDetailsRoutes 
app.use('/api/vehicleDetails', vehicleDetailsRoute );

//use workOrderRoutes 
app.use('/api/workOrder', workOrderRoutes );


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

