const dotenv 		= require('dotenv').config();
const mongoose		= require('mongoose');
const app			= require('../src/app');
const scripts		= require('./scripts')

async function run() {
	let mongooseOptions = {
		useNewUrlParser	: true,
		useCreateIndex	: true,
		autoIndex		: true,
	};

	try {
		// Connect to the database
		const uri	=  process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
		mongoose.connect(uri, mongooseOptions);

		if(process.env.INITIALIZE_MONGO == 'YES') {
			scripts.init();
		}

		app.listen(process.env.PORT, function(err) {
			if(err) throw err;
			console.log('Sucessfully listening to port [' + process.env.PORT + ']');
		});
	} catch (err) {
		console.log(err);
	}
}

run().catch(error => console.error(error.stack));
