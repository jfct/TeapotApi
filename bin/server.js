const dotenv 		= require('dotenv');
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
		// Define ENV file
		const result 		= dotenv.config();
		if (result.error) {
			throw result.error;
		}
		const { parsed: envs } = result;

		// Connect to the database
		const uri	=  envs.SERVER_IP + ':' + envs.SERVER_PORT + '/' + envs.SERVER_DB_NAME;
		mongoose.connect(uri, mongooseOptions);

		if(envs.INITIALIZE_MONGO == 'YES') {
			scripts.init();
		}

		app.listen(envs.PORT, function(err) {
			if(err) throw err;
			console.log('Sucessfully listening to port [' + envs.PORT + ']');
		});
	} catch (err) {
		console.log(err);
	}
}

run().catch(error => console.error(error.stack));
