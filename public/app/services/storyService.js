(function() {
	'use strict';

	angular.module('storyService', []).factory('Story', storyFactoryFunc).factory('socketio', socketioFunc);

	storyFactoryFunc.$inject = ['$http'];

	function storyFactoryFunc($http) {
	
		var storyFactory = {
			create: create,
			allStory: allStory,
			globalStories: globalStories
		};

		return storyFactory;

		//////////////////////

		function create(storyData) {
			return $http.post('/api', storyData);
		}

		function allStory() {
			return $http.get('/api');
		}

		function globalStories() {
			return $http.get('/api/globalStories');
		}
	}


	socketioFunc.$inject = ['$rootScope'];

	function socketioFunc($rootScope) {
		var socket = io.connect();

		return {
			on: function(eventName, callback) {
				socket.on(eventName, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						callback.apply(socket, args);
					});
				});
			},
			emit: function(eventName, data, callback) {
				socket.emit(eventName, data, function() {
					var args = arguments;
					$rootScope.apply(function() {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				});
			}
		};
	}
})();