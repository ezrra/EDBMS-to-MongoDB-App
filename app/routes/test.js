var test = require('../controllers/test');

module.exports = function (app, express) {

	var router = express.Router();

	router.route('/test')
  		.post(test.valid)

	return router;
  
}