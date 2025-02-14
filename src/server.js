require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const employeeRoutes = require('./routes/employeeRoutes');
const journeyRoutes = require('./routes/journeyRoutes');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use('/employees', employeeRoutes);
app.use('/journeys', journeyRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
