const mongoose          = require('mongoose')
const Beverage          = require('../src/model/beverage');
const BeverageType      = require('../src/model/beverageType');
const Ingredient        = require('../src/model/ingredient');
const Order             = require('../src/model/order');
const Stock             = require('../src/model/stock');
const Size              = require('../src/model/size');
const OrderService      = require('../src/service/orderService');
const BeverageService   = require('../src/service/beverageService');

const mongooseOptions = {
    useNewUrlParser	: true,
    useCreateIndex	: true,
    autoIndex		: true,
};


module.exports = {
  init              : () => mongoose.connect(process.env.TEST_DB_URL, mongooseOptions),
  close             : () => mongoose.disconnect(),
  Beverage          : Beverage,
  BeverageType      : BeverageType,
  Ingredient        : Ingredient,
  Order             : Order,
  Stock             : Stock,
  Size              : Size,
  OrderService      : OrderService,
  BeverageService   : BeverageService
}