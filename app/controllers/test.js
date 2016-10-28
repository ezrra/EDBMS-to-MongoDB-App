'use strict';

var mongoose 	= require('mongoose'),
	Connection 	= mongoose.model('Connection');

exports.valid = function (req, res) {

	// console.log(req)

	// res.json(req.params)

	Connection.findById(req.params.connectionId, function (err, connection) {

			if (err) {

				return res.status(400).send({
       				message: 'Error:' + err
     			});
			};

			res.json(connection);
		});

};