angular
	.module('App')
	.factory('Connection', function ($resource) {
		return $resource('/api/connections/:id', { id: "@_id"}, {
			update: {
      			method: 'PUT' // this method issues a PUT request
    		}
		});
	})