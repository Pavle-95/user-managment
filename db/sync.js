const sequelize = require('./dbsequelize');
const User = require('../models/User');

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await User.sync({ force: true })
        console.log('User table has been created or updated successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

syncDatabase();