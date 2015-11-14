angular.module('appRoutes', ['ngRoute']).config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'app/views/partials/home.html',
		controller: 'MainController',
		controllerAs: 'main'
	}).when('/login', {
		templateUrl: 'app/views/partials/login.html'
	}).when('/signup', {
		templateUrl: 'app/views/partials/signup.html'
	}).when('/globalStories', {
		templateUrl: 'app/views/partials/allStories.html',
		controller: 'AllStoriesCtrl',
		controllerAs: 'story',
		resolve: {
			stories: function(Story) {
				return Story.globalStories();
			}	
		}
	});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});