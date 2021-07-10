const express       = require('express');
const app           = express();

//Rotas
const beverages = require('./routes/beverageRoute');
app.use('/beverages', beverages);

module.exports = app;