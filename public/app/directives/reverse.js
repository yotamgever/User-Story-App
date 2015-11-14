(function() {
	'use strict';
	angular.module('reverseDirective', []).filter('reverse', reverseFilter);

	function reverseFilter() {
		return function(items) {
			return items.slice().reverse();
		};
	}
})();