angular
	.module('App')
	.controller('ConnectionNewCtrl', connectionNewCtrl);

function connectionNewCtrl ($scope, Connection, $location) {

	$scope.connection = {};

	$scope.create = function () {

		Connection.save($scope.connection, function (response) {
			
			if (response.$resolved) {

				$location.url('connections/');
			}
			
		});
	}

	$scope.btnTest = function () {
		
		console.log($scope)
	}

};