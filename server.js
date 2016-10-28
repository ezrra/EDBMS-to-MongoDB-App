var	express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	morgan 		= require('morgan'),
	config		= require('./config'),
	path 		= require('path'),
	// mongodb 	= require('mongodb').MongoClient,
    mongoose    = require('mongoose'),
	PORT 		= 3000,
	sql 		= require('mssql'),
    mysql       = require('mysql');


app.set('port', PORT || config.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/public')));

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

require('./app/models/connection');

var connections = require('./app/routes/connections')(app, express);
var test        = require('./app/routes/test')(app, express);

app.use('/api', connections);
app.use('/api', test);

app.get('/*', function(req, res) {

  	res.sendFile(__dirname + '/public/index.html');
});

mongoose.connect(config.database, function (err) {

    if (err) {

        console.log('Database error.' + err)

        throw err;
    }

    app.listen(config.port, function () {
    
        console.log('Running ... ' + config.port);
    });
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

// test mysql

/* var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : ''
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

  // console.log('connected as id ' + connection.threadId);

    connection.query('show databases;', function (error, results, fields) {

        console.log(results)

        if (error) {
            console.log(error)
        }
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
    });

    connection.end();
}); */



// Test mssql

/* sql.connect(configSQL).then(function() {
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
}); */