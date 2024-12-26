const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('Lab5_Ex4', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});


module.exports = sequelize;
