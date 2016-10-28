angular
	.module('App')
	.controller('ConnectionIndexCtrl', connectionIndexCtrl);

function connectionIndexCtrl ($scope, Connection) {

	$scope.connections = {};


	$scope.connections = Connection.get(function (response) {
		
		$scope.connections = response.data;
	});

	// console.log(Connection.get())
};