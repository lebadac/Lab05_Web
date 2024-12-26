const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Sequelize instance

const User = sequelize.define('Users', {
    UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING
    },
    RegistrationDate: {
        type: DataTypes.DATE
    }
});

module.exports = User;
