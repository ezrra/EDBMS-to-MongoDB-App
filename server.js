const 	express 		= require('express'),
		app 			= express(),
		bodyParser 		= require('body-parser'),
		morgan 			= require('morgan'),
		config			= require('./config'),
		path 			= require('path'),
		mongodb 		= require('mongodb').MongoClient;


// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(morgan('dev'));

// mongoose.connect(config.database);

app.use(express.static(__dirname + '/public'));

var router = require('./app/routes/api')(app, express, db);

app.use('/api', router);

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

var db;

/*mongodb.connect(config.database, function (err, database) {

	if (err) {
		console.log(err);
		process.exit(1);
	}

	db = database;

	console.log('Database connection ready');*/

	app.listen(config.port, function () {
	
		console.log('Running ... ' + config.port);
	});

// });