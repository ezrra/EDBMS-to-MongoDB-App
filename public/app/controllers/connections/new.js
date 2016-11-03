angular
	.module('App')
	.controller('ConnectionNewCtrl', connectionNewCtrl);

function connectionNewCtrl ($scope, Connection, $location, $http, ngNotify) {

	$scope.connection = {};

	$scope.create = function () {

		Connection.save($scope.connection, function (response) {
			
			if (response.$resolved) {

				$location.url('connections/');
			}
			
		});
	}

	$scope.btnTest = function () {

		var req = {
			method: 'POST',
		 	url: '/api/test',
		 	isArray: true,
		 	data: $scope.connection
		}

		$http(req).then(function (response) {

			if (response.data.success) {
				ngNotify.set(response.data.msg, {
                    type: 'success'
                });
			} else {

				ngNotify.set('Error: ' + response.data.msg, {
                    type: 'error'
                });
			}

		}, function (err) {

			ngNotify.set('Error: ' + err, {
                type: 'error'
            });

		});
	}

};