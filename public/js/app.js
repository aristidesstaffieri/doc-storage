'use strict';

angular.module('doc-storage', [
	'ngRoute',
	'firebase'
])
.constant('FIREBASE_URL', 'https://doc-storage.firebaseio.com//')
.config(['$routeProvider', '$locationProvider', '$logProvider', 
	function ($routeProvider, $locationProvider, $logProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/home.ejs'
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode(true);
	$logProvider.debugEnabled(true);

}]);