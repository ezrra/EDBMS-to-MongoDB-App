var mysql	= require('mysql');

exports.mysql = function (conn, callback) {

	var connection = mysql.createConnection({
	  	host: conn.host,
	  	user: conn.username,
	  	password: conn.password,
	  	database: conn.database || ""
	});

	return connection.connect(function(err) {

		var response = {
			msg: "Success connection",
			success: true,
			connection: connection
		}

	  	if (err) {
	    	console.error('error connecting: ' + err.stack);
	    	response.msg = 'Error: ' + err;
	    	response.success = false;
	  	}

	  	// connection.end();

	  	callback(response)
	});
}