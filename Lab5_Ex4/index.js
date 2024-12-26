const express = require('express'); 
const bodyParser = require('body-parser'); 
const fetchUsersRoutes = require('./routes/fetchUsers');

const app = express();


app.use(bodyParser.json());


app.use('/user', fetchUsersRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
