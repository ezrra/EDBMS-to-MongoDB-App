'use strict';

var mongoose 	= require('mongoose'),
	Connection 	= mongoose.model('Connection'),
	connection 	= require('../helpers/connection.js');

exports.valid = function (req, res) {

	var conn = {
		host: req.body.host,
		username: req.body.username,
		password: req.body.password,
		database: ""
	};

	connection.mysql(conn, function (response) {

		response.connection.end();

		res.json({ success: response.success, msg: response.msg });
	});

	// console.log(req)

	// res.json(req.params)

	/* Connection.findById(req.params.connectionId, function (err, connection) {

			if (err) {

				return res.status(400).send({
       				message: 'Error:' + err
     			});
			};

			res.json(connection);
		}); */
		
		



		// res.json({ todo: 'bien' })
		/* connection.mysql(connection, function (response) {
		res.json({ response:  response});
		}) */
  		

};