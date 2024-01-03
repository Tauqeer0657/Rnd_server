const db = require('../db');


// posting Work Order Details 

exports.addWorkOrderDetails = async (req, res) => {
    const {
        ServiceDescription,
        ServiceLineNo,
        UoM,
        ContractRate,
      } = req.body;
    
      // Define the SQL query to insert a new item
      const sql = 'INSERT INTO tbWorkOrderDetails (ServiceDescription, ServiceLineNo, UoM, ContractRate) VALUES (?, ?, ?, ?)';
    
      // Execute the SQL query to insert the item data
      db.query(
        sql,
        [ServiceDescription, ServiceLineNo, UoM, ContractRate],
        (err, result) => {
          if (err) {
            console.error('MySQL query error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            console.log('Item data inserted:', result);
            res.status(201).json({ message: 'Item data inserted successfully' });
          }
        }
      );
    };


// getting Work Order Details

exports.getWorkOrderDetails = async (req, res) => {
  // Define the SQL query to retrieve all job ManPower details

  const sql = 'SELECT * FROM tbWorkOrderDetails';

  // Execute the SQL query to retrieve ManPower detail data
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Job ManPower details retrieved:', rows);
      res.status(200).json(rows); // Send the retrieved data as JSON response
    }
  });
};


// getting Single Work Order Details

exports.getSingleWorkOrderDetails = async (req, res) => {
    const { WorkOrderNo } = req.params;

    // Define the SQL query to retrieve job data by JobNo
    const sql = 'SELECT * FROM tbWorkOrderDetails WHERE WorkOrderNo = ?';
  
    // Execute the SQL query to retrieve job data
    db.query(sql, [WorkOrderNo], (err, rows) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (rows.length === 0) {
        res.status(404).json({ error: 'WorkOrderNo not found' });
      } else {
        console.log('WorkOrderNo data retrieved:', rows[0]);
        res.status(200).json(rows[0]); // Send the retrieved data as JSON response
      }
    });
  };


// updating Work Order Details

exports.updateWorkOrderDetails = async (req, res) => {
try {
    const { WorkOrderNo } = req.params;
    const updatedJobData = req.body;

    // Check if the job with the specified WorkOrderNo exists
    const checkExistenceQuery = 'SELECT * FROM tbWorkOrderDetails WHERE WorkOrderNo = ?';
    db.query(checkExistenceQuery, [WorkOrderNo], (err, rows) => {
        if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (rows.length === 0) {
        return res.status(404).json({ error: 'Work not found' });
        }

        // Update the job data
        const updateQuery = 'UPDATE tbWorkOrderDetails SET ? WHERE WorkOrderNo = ?';
        db.query(updateQuery, [updatedJobData, WorkOrderNo], (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Job data updated:', result);
            res.status(200).json({ message: 'Work details updated successfully' });
        }
        });
    });
    } catch (err) {
    console.error('Error handling job update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    }
};


// deleting Work Order Details

exports.deleteWorkOrderDetails = async (req, res) => {
    const { WorkOrderNo } = req.params;

    // Define the SQL query to delete a customer by customerCode
    const sql = 'DELETE FROM tbWorkOrderDetails WHERE WorkOrderNo = ?';
  
    // Execute the SQL query to delete the customer
    db.query(sql, [WorkOrderNo], (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        console.log('WorkOrderNo deleted:', result);
        res.status(204).send(); // Send a 204 No Content response on successful deletion
      }
    });
  };