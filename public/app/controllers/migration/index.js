angular
	.module('App')
	.controller('MigrationIndexCtrl', migrationIndexCtrl);

function migrationIndexCtrl ($scope, $http) {

	$scope.connections = {};

	$scope.databases = {};

	$scope.connection_id = "";

	var req = {
		method: 'GET',
	 	url: '/api/connections/all',
	 	isArray: true
	}

	$http(req).then(function (response) {

		$scope.connections = response.data.data;

		console.log(response.data.data)

	}, function (err) {

		console.log(err)

	});

	$scope.selectConnection = function (connection_id) {

		$scope.connection_id = connection_id;

		var req = {
			method: 'GET',
		 	url: '/api/migration/databases/' + connection_id,
		 	isArray: true
		}

		$http(req).then(function (response) {

			console.log(response)

			$scope.databases = response.data;

		}, function (err) {

			console.log(err)

		});
	}

	$scope.selectDatabase = function (database) {
		
		var connection_id = $scope.connection_id;

		var req = {
			method: 'GET',
		 	url: '/api/migration/tables/' + connection_id + '/' + database,
		 	isArray: true
		}

		$http(req).then(function (response) {

			console.log(response)

			// $scope.databases = response.data;

		}, function (err) {

			console.log(err)

		});

	}

	/*console.log(response)

		// response.connection.database = "test";

		response.connection.query('select * from users', function(err, rows, fields) {
		  if (err) throw err;

		  console.log(fields);
		});*/

	// $scope.connections = {};

};