var connections = require('../controllers/connections');

module.exports = function (app, express) {

	var router = express.Router();

	router.route('/connections')
  		.get(connections.list)
  		.post(connections.create)
  	
  	router.route('/connections/all')
  		.get(connections.all)

    router.route('/connections/request/:id')
      .get(connections.request)
	/* router.route('/connections/:id')
  		.get(connections.get)
  		.put(connections.update)
  		.delete(connections.delete) */

	return router;
}