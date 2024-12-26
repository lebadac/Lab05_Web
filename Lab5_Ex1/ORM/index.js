const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const shoppingCartRoutes = require('./routes/shoppingCart');
const sequelize = require('./models/index');

const app = express();
app.use(bodyParser.json());

app.use('/orm/user', userRoutes);
app.use('/orm/product', productRoutes);
app.use('/orm/shoppingCart', shoppingCartRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('ORM Server running on http://localhost:3000'));
}).catch(err => console.error('Database connection failed:', err));
