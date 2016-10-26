angular
	.module('app.routes', ['ngRoute'])
	.config(config)
  .run(run);

function config ($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider
      	.when('/', {
        	templateUrl: 'app/views/home.html',
        	controller: 'HomeCtrl',
        	controllerAs: ''
      	})
      	.otherwise({
        	redirectTo: '/'
      	});
    
    $locationProvider.html5Mode(true);
}

function run ($rootScope) {

  // $rootScope.loading = false;

  /* $rootScope.$on('loaderShow', function () {

    $rootScope.loading = true;

  });

  $rootScope.$on('loaderHide', function () {

    $rootScope.loading = false;

  }); */

}