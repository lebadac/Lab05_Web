const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define('Product', {
  ProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ManufacturingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Product;
