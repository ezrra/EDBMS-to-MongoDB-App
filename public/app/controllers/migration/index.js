angular
	.module('App')
	.controller('MigrationIndexCtrl', migrationIndexCtrl);

function migrationIndexCtrl ($scope, $http) {

	$scope.connections = {};

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

		console.log(connection_id)
	}

	// $scope.connections = {};

};