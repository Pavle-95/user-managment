const express = require("express");
const mysql = require('mysql2');

require('dotenv').config();
require('./db/sync');

// DB Configuration
const dbConfig = require('./db/dbconfig');

// Routes
const userRoute = require('./routes/userRoute');

// Initialize the app
const app = express();

// Middleware
app.use(express.json());

// Use routes
app.use('/api', userRoute);

// Create MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((error) => {
    if (error) {
      console.error('Unable to connect to the database:', error);
        return;
    }
    console.log('connected to the database!');
});

// App Listen
const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.ENVIRONMENT} mode on port ${PORT}`);
});