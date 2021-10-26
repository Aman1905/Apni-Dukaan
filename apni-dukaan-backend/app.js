const express = require('express');
const app = express();
const errorMiddleware = require("./middleware/Error");

app.use(express.json());

// routes
const product = require('./routes/ProductRoute');
const user = require('./routes/UserRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);

// Middleware for error
app.use(errorMiddleware);

module.exports = app