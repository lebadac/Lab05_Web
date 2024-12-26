const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 

//User
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING
}, {
    timestamps: false 
});

// Sync with database
sequelize.sync();

module.exports = User;
