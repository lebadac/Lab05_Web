const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product')// Đường dẫn chính xác tới sql.js
const shoppingCartRoutes = require('./routes/shoppingCart')
const app = express();
app.use(bodyParser.json());

// Đăng ký route cho SQL
app.use('/sql/user', userRoutes);
app.use('/sql/product', productRoutes);
app.use('/sql/shoppingCart', shoppingCartRoutes)
app.listen(3000, () => console.log('SQL Server running at http://localhost:3000'));
