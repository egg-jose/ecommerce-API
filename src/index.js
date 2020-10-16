const express = require('express');
const app = express();

//Import env variable
const env = require('./config/envioroment');

//Import routes
const authRoutes = require('./middlewares/auth');

//Connect to database
const db = require('./config/database');
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

//Middleware
app.use(express.json());

//Routes
app.use('/api/user', authRoutes);

//Start API
const port = env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
