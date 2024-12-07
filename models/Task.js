const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbsequelize');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tasks',
  timestamps: true,
})

module.exports = Task;