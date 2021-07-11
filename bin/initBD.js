const mongoose                      = require('mongoose');
const uri				            =  "mongodb://localhost:27017/";
const { Beverage, BeverageType }	= require('../src/model/beverage');
const Ingredient					= require('../src/model/ingredient');

let mongooseOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	autoIndex: true,
};

mongoose.connect(uri, mongooseOptions, function(err) {
	if(err) throw err;

	console.log('Connected successfully connected');

	// BeverageType.deleteMany({}, function(err) {
	// 	if (err) return err;
	// });
    // Beverage.deleteMany({}, function(err) {
	// 	if (err) return err;
	// });
    // Ingredient.deleteMany({}, function(err) {
	// 	if (err) return err;
	// });


    let water = new Ingredient({
        name: 'Water',
        unit: 'ml'
    });
    water.save(function(err) {
        if (err) throw err;
        console.log('[ingredient] water created');
    });

    let greenTeaLeaves = new Ingredient({
        name: 'Green Tea Leaf',
        unit: 'unit'
    });
    greenTeaLeaves.save(function(err) {
        if (err) throw err;
        console.log('[ingredient] greenTea created');
    });


    let tea = new BeverageType({
        name: 'Tea',
    });
    tea.save(function(err) {
        if (err) throw err;
        console.log('[beverageType] tea created');
    });

    
    let greenTea = new Beverage({
        name		: 'Green Tea',
        beverageType: tea._id,
        recipe		: [{
            ingredient: water._id,
            quantity: 1
        }, {
            ingredient: greenTeaLeaves._id,
            quantity: 1
        }],
        settings: {
            waterTemp: 100
        }
    });
    greenTea.save(function(err) {
        if (err) throw err;
        console.log('[beverage] green tea created');
    });
});