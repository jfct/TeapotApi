const app	= require('../src/app');
const port	= normalizaPort(process.env.PORT || '3000');

const mongoose	= require('mongoose');
const uri		=  "mongodb://localhost:27017/test";

const { Beverage, BeverageType }	= require('../src/model/beverage');
const Ingredient					= require('../src/model/ingredient');

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
		mongoose.connect(uri, mongooseOptions);
		
		console.log(await Ingredient.list({lean: true}));
		
		app.listen(port, function(err) {
			console.log('Sucessfully listening to port [' + port + ']');
		});
	} catch (err) {
		console.log(err);
	}
}

run().catch(error => console.error(error.stack));
