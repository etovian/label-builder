(function() {
	'use strict';

	angular.module('app').factory('NavigationService', ['$location', NavigationService]);

	function NavigationService($location) {

		return {
			goTo: function(path) {
				$location.path(path);
			},
			goToIngredients: function() {
				this.goTo('/ingredients');
			}
		};
	}
})();