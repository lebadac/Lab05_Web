const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('Lab5_Ex1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
