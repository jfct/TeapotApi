const mongoose		= require('mongoose');
const app			= require('../src/app');
const Beverage		= require('../src/model/beverage');
const Stock			= require('../src/model/stock');
const BeverageType	= require('../src/model/beverageType');
const Ingredient	= require('../src/model/ingredient');
const port			= normalizaPort(process.env.PORT || '3000');
const uri			=  "mongodb://localhost:27017/test";

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
	if (port >= 0) {
			return port;
	}
	return false;
}

async function run() {
	let mongooseOptions = {
		useNewUrlParser	: true,
		useCreateIndex	: true,
		autoIndex		: true,
	};

	try {
		// Connect to the database
		mongoose.connect(uri, mongooseOptions);

		let beverage	= await Beverage.load('Green Tea');
		let water 		= await Ingredient.load('Water');
		let bevType		= await BeverageType.load('Tea');
		let stock 		= await Stock.load();

		if(stock == null) {
			stock = new Stock({
				ingredients: []
			});
		}
		
		console.log('bT', bevType);
		console.log(await bevType.changeName('Cold Tea'));


		// console.log(beverage);
		// await stock.addIngredient('Water', 250);
		// await stock.addIngredient('Green Tea Leaf', 25);
		// stock.addIngredient('Green Tea sdfasdLeaf', 25);
		// await stock.removeIngredient('Green Tea Leaf');
		// stock.removeQuantity('Water', 700);



		//console.log(Object.keys(beverage).length);
		//console.log(Object.keys(stock).length);
		
		//let res = await beverage.updateSettingsComponent('waterTemp', 50);
		//console.log(res);
		// let updatedRecipe = [{
		// 	ingredient: await Ingredient.load('Water'),
		// 	quantity: 10
		// }];
		// beverage.updateRecipe(updatedRecipe);

		//beverage.updateSettingsComponent('waterTemp', 40);

		app.listen(port, function(err) {
			if(err) throw err;
			console.log('Sucessfully listening to port [' + port + ']');
		});
	} catch (err) {
		console.log(err);
	}
}
run().catch(error => console.error(error.stack));
