// var test = require('../controllers/test');
var mongoose 	= require('mongoose'),
	mysql       = require('mysql'),
	Connection 	= mongoose.model('Connection'),
	Conn 		= require('../helpers/connection.js');

module.exports = function (app, express) {

	var router = express.Router();

	router.get('/migration/databases/:connectionId', function(req, res) {

	  	Connection.findById(req.params.connectionId, function (err, connection) {

			if (err) {

				return res.status(400).send({
       				message: 'Error:' + err
     			});
			};

			var conn = {
				host: connection.host,
				username: connection.username,
				password: connection.password,
				database: ""
			};

			Conn.mysql(conn, function (response) {

				response.connection.query('show databases;', function(err, rows, fields) {

				  if (err) {
				  	return res.status(400).send({
	       				message: 'Error:' + err
	     			});
				  }

				  response.connection.end();

				  res.json(rows);

				});
				
			});

		});
	});

	router.get('/migration/tables/:connectionId/:databaseName', function (req, res) {

		Connection.findById(req.params.connectionId, function (err, connection) {

			if (err) {

				return res.status(400).send({
       				message: 'Error:' + err
     			});
			};

			var conn = {
				host: connection.host,
				username: connection.username,
				password: connection.password,
				database: req.params.databaseName
			};

			Conn.mysql(conn, function (response) {

				var counter = 0;

				var tables = [];

				response.connection.query("SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = '" + req.params.databaseName + "'", function(err, rowsTables, fields) {

					if (err) {
					  	return res.status(400).send({
		       				message: 'Error:' + err
		     			});
					}

					rowsTables.forEach(function (iterator) {

						var tableName = iterator.table_name;

						response.connection.query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '" + tableName + "'", function (err, rowsColums, fields) {

						  	var table = { name: tableName, colums: rowsColums };

						  	tables.push(table);

						  	if (err) {

				     			return res.status(400).send({
				       				message: 'Error:' + err
				     			});
							}

							if (counter == rowsTables.length) {

					  			res.json(tables);
					  		}

						});
						
					})

			  		counter++;

				  	response.connection.end();

				});
				
			});
						
		});
	});

	function getTables (response, rowsTables, callback) {

		/*for (var i = 0; i < rowsTables.length; i++) {

		  	var tableName = rowsTables[i].table_name;

			queryTable (response, tableName, function (data) {

				callback(data);

			})
		}*/
		
	}

	function queryTable (response, tableName, callback) {

		/*response.connection.query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '" + tableName + "'", function (err, rowsColums, fields) {

		  	var table = { name: tableName, colums: rowsColums };

		  	if (err) {

     			console.log(err)

     			return res.status(400).send({
       				message: 'Error:' + err
     			});
			}

			callback(table);
			
		});*/
	}

	return router;
  
}