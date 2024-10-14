const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('camwa_db', 'root', '1234', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',
});

module.exports = sequelize;
