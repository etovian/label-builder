(function() {

	'use strict';

	var deps = ['LabelService', '$routeParams', IngredientsController];
	angular.module('app').controller('IngredientsController', deps);

	function IngredientsController(labelService, $routeParams) {

		var vm = this;
		angular.extend(vm, {
			label: labelService.getSelectedLabel()
		});
	}

})();