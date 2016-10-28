'use strict';

var mongoose 	= require('mongoose'),
	mysql       = require('mysql'),
	Connection 	= mongoose.model('Connection');

exports.create = function (req, res) {

	var connection = new Connection(req.body);

	  connection.save(function (err) {
	    if (err) {
	      	return res.status(400).send({
	        	message: 'Error'
	      	});
	    } else {
	    	res.json(connection);
	    }
	});
};

exports.all = function (req, res) {

	Connection.find({}, function (err, connections) {

		if (err) {
			return res.status(400).send({
   				message: 'Error'
 			});
		}

		res.json({ data: connections });

	})
}

var connection = {};

exports.request = function (req, res) {

	Connection.findById(req.params.id, function (err, connection) {

		if (err) {
			return res.status(400).send({
   				message: 'Error:' + err
 			});
		};

		if (connection.type == 'mysql') {

			connectionToMySQL(connection, function (response) {
				res.json({ response:  response});
			})
		}
	});
}

/* Historias */

/*

Crear una clase, function connection MySQL, 
return error (boolen), conexion (Object)
Utilizar las funciones en /test, /migration
*/

// Returt ok and Database;

function connectionToMySQL (connection, callback) {

	connection = mysql.createConnection({
	  	host: connection.host,
	  	user: connection.username,
	  	password: connection.password,
	  	database: ''
	});

	connection.connect(function(err) {

		var response = true;

	  	if (err) {
	    	console.error('error connecting: ' + err.stack);
	    	response = false;
	  	}

	  	connection.end();

	  	callback(response)
	});

}

function getDatabaseByConnectionMySQL () {


}

function getTablasByDatabaseMySQL () {


}

function getFieldByTableMySQL () {


}

exports.list = function (req, res) {

	if (!req.query.page) {

		var page = 1;

	} else {
		
		var page = req.query.page;
	}

	var query = {};

	if (req.query.search) {

		var search = req.query.search,
			regex = new RegExp(req.query.search, "i"),
			query = { fullName: regex };
	}

	var per_page = 10;

	Connection.find(query, function (err, connections) {

		if (err) {
			return res.status(400).send({
   				message: 'Error'
 			});
		}

		Connection.count(query, function (err, count) {

			if (err) {

				return res.status(400).send({
       				message: 'Error:' + err
     			});

			}

			res.json({ data: connections, count: count });

		});

	}).sort('-created_at').skip((page-1)*per_page).limit(per_page);

}

exports.get = function (req, res) {

	/* Patient.findById(req.params.id, function (err, patient) {

			if (err) {

				return res.status(400).send({
       				message: 'Error:' + err
     			});
			};

			res.json(patient);
		}); */
};

exports.update = function (req, res) {

	/* Patient.findById(req.params.id, function (err, patient) {

			if (err) {

				return res.status(400).send({
       				message: 'Error:' + err
     			});
			};

			patient.update(req.body, function (err) {
                
                if (err) {
				
					return res.status(400).send({
	       				message: 'Error:' + err
	     			});
				};

                res.json({ message: 'Updated' });
            });

		}); */
};

exports.delete = function (req, res) {

	// 
};