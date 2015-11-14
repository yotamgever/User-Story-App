(function() {
	'use strict';

	angular.module('storyCtrl', ['storyService']).controller('StoryController', StoryController)
	.controller('AllStoriesCtrl', AllStoriesController);

	StoryController.$inject = ['Story', 'socketio'];

	function StoryController(Story, socketio) {
		var vm = this;

		vm.createStory = createStory;
		
		activate();

		//////////////////////

		function activate() {
			Story.allStory().success(function(data) {
				vm.stories = data;
			});


			socketio.on('story', function(data) {
				vm.stories.push(data);
			});
		}

		function createStory() {
			vm.message = '';

			Story.create(vm.storyData).success(function(data) {
				// vm.stories.push(vm.storyData);

				vm.storyData = '';

				vm.message = data.message;

			});
		}



	}

	AllStoriesController.$inject = ['stories', 'socketio'];

	function AllStoriesController(stories, socketio) {
		var vm = this;
		vm.stories = stories.data;

		socketio.on('story', function(data) {
			vm.stories.push(data);
		});
	}
})();