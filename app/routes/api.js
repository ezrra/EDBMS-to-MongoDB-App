module.exports = function (app, express, db) {

	var routes = express.Router();

	routes.get('/listDatabases', function (req, res) {

		var adminDb = db.admin();

		adminDb.listDatabases(function (err, dbs) {

			res.json(dbs.databases);

			db.close();
		});

		

		/* User.findOne({ 'username': 'israel' }, function (err, user) {

			if (!user) {
				var sampleUser = new User();

				sampleUser.name 	= 'Israel M';  
				sampleUser.username = 'israel'; 
				sampleUser.password = 'password';
				sampleUser.save();

				res.json({
					message: 'User created'
				});
			
			} else {

				console.log(user);

				user.password = 'password';
				user.save();

				res.json({
					message: 'User: ' + user.username + " updated"
				});

			}

		}); */
	});

	return routes;

}