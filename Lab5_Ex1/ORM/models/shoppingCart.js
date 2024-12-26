const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const Product = require('./product');

const ShoppingCart = sequelize.define('ShoppingCart', {
  CartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'UserId',
    },
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'ProductId',
    },
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
ShoppingCart.belongsTo(User, { foreignKey: 'UserId' });
ShoppingCart.belongsTo(Product, { foreignKey: 'ProductId' });

module.exports = ShoppingCart;
