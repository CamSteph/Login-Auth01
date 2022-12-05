// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const LoggerMiddleware = require('./logger');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(LoggerMiddleware);

const port = process.env.API_PORT || 4000;

app.listen(port, () => console.log(`API Listening on port ${port}`));

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// app.get('/api/user', (req, res) => {
//   console.log('/api/user');
//   res.status(200).send({user: 'Cameron Stephenson'});
// });