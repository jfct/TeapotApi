const express       = require('express');
const app           = express();

// Add the body parser
app.use(express.json());

//Rotas
const beverages     = require('./routes/beverageRoute');
const ingredients   = require('./routes/ingredientRoute');
const stock         = require('./routes/stockRoute');
const order         = require('./routes/orderRoute');

app.use('/beverages', beverages);
app.use('/ingredients', ingredients);
app.use('/stock', stock);
app.use('/orders', order);

module.exports = app;