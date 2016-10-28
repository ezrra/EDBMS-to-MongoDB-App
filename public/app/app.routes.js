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
        .when('/connections/new', {
          templateUrl: 'app/views/connections/new.html',
          controller: 'ConnectionNewCtrl',
          controllerAs: ''
        }).when('/connections', {
          templateUrl: 'app/views/connections/index.html',
          controller: 'ConnectionIndexCtrl',
          controllerAs: ''
        })
        .when('/migration', {
          templateUrl: 'app/views/migration/index.html',
          controller: 'MigrationIndexCtrl',
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