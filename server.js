var	express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	morgan 		= require('morgan'),
	config		= require('./config'),
	path 		= require('path'),
	mongodb 	= require('mongodb').MongoClient,
	PORT 		= 3000,
	sql 		= require('mssql');


app.set('port', PORT || config.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/public')));

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.get('/*', function(req, res) {

  	res.sendFile(__dirname + '/public/index.html');
});

// use body parser so we can grab information from POST requests
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
// app.use(morgan('dev'));

// mongoose.connect(config.database);

app.use(express.static(path.join(__dirname + '/public')));

var router = require('./app/routes/api')(app, express, db);

app.use('/api', router);

app.get('/*', function(req, res) {

  	res.sendFile(__dirname + '/public/index.html');
});

var db;*/

app.listen(config.port, function () {
	
	console.log('Running ... ' + config.port);
});

var configSQL = {
    user: 'test',
    password: 'arkus@000',
    server: "localhost\\SQL2014", // You can use 'localhost\\instance' to connect to named instance
    database: 'test' ,
    options: {
        encrypt: true // Use this if you're on Windows Azure
        // , instanceName: 'SQL2014'
    }
}

/* sql.connect("mssql://test_user:password@ISRAEL-MONGODB\\SQL2014/test", function (err, database) {

	if (err) {
		console.log(err);
		process.exit(1);
	}

	db = database;

	console.log('Database connection ready');

}); */



// Test mssql

sql.connect(configSQL).then(function() {
    // Query

    new sql.Request().query('select * from Users').then(function(recordset) {
        console.dir(recordset);
        
    }).catch(function(err) {
    	console.log(err)
        // ... query error checks
    });
    
   
}).catch(function(err) {
	console.log(err)
    // ... connect error checks
});