const db = require('../db');


// posting vehicle details 

exports.addVehicleDetails = async (req, res) => {
    const {
        vehicle_No,
        vehicle_category,
        vehicle_type
      } = req.body;
    
      // Define the SQL query to insert a new item
      const sql = 'INSERT INTO tbVehicleDetails (vehicle_No, vehicle_category, vehicle_type) VALUES (?, ?, ?)';
    
      // Execute the SQL query to insert the item data
      db.query(
        sql,
        [vehicle_No, vehicle_category, vehicle_type],
        (err, result) => {
          if (err) {
            console.error('MySQL query error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            console.log(' Vehicle details inserted:', result);
            res.status(201).json({ message: 'Vehicle details inserted successfully' });
          }
        }
      );
};


// getting Vehicle Details

exports.getVehicleDetails = async (req, res) => {
    const sql = 'SELECT * FROM tbVehicleDetails';

    // Execute the SQL query to retrieve ManPower detail data
    db.query(sql, (err, rows) => {
        if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        console.log('Vehicle details retrieved:', rows);
        res.status(200).json(rows); // Send the retrieved data as JSON response
        }
    });
};


// getting single vehicle Details

exports.getSingleVehicleDetails = async (req, res) => {
    const { vehicle_No } = req.params;

    // Define the SQL query to retrieve job data by JobNo
    const sql = 'SELECT * FROM tbVehicleDetails WHERE vehicle_No = ?';
  
    // Execute the SQL query to retrieve job data
    db.query(sql, [vehicle_No], (err, rows) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (rows.length === 0) {
        res.status(404).json({ error: 'vehicle not found' });
      } else {
        console.log('vehicle data retrieved:', rows[0]);
        res.status(200).json(rows[0]); // Send the retrieved data as JSON response
      }
    });
};

// updating Vehicle Details

exports.updateVehicleDetails = async (req, res) => {
try {
    const { vehicle_No } = req.params;
    const updatedJobData = req.body;

    // Check if the job with the specified vehicle_No exists
    const checkExistenceQuery = 'SELECT * FROM tbVehicleDetails WHERE vehicle_No = ?';
    db.query(checkExistenceQuery, [vehicle_No], (err, rows) => {
    if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (rows.length === 0) {
        return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Update the vehicle details
    const updateQuery = 'UPDATE tbVehicleDetails SET ? WHERE vehicle_No = ?';
    db.query(updateQuery, [updatedJobData, vehicle_No], (err, result) => {
        if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        console.log('Vehicle details updated:', result);
        res.status(200).json({ message: 'Vehicle details updated successfully' });
        }
    });
    });
} catch (err) {
    console.error('Error handling vehicle update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
}
};


// deleting Vehicle Details

exports.deleteVehicleDetails = async (req, res) => {
    const { vehicle_No } = req.params;

    // Define the SQL query to delete a vehicle details by vehicle_no
    const sql = 'DELETE FROM tbVehicleDetails WHERE vehicle_No = ?';
  
    // Execute the SQL query to delete the customer
    db.query(sql, [vehicle_No], (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'vehicle details not found' });
      } else {
        console.log('vehicle_No deleted:', result);
        res.status(200).json({ message: 'vehicle details deleted successfully' }); 
      }
    });
  };