var	express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	morgan 		= require('morgan'),
	config		= require('./config'),
	path 		= require('path'),
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
var migration = require('./app/routes/migrations')(app, express);

app.use('/api', connections);
app.use('/api', test);
app.use('/api', migration);

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