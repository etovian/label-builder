(function() {

	'use strict';

	var deps = [
		'$uibModal', 
		'LabelService',
		FontColorsController
	];
	angular.module('app').controller('FontColorsController', deps);

	function FontColorsController($uibModal, labelService) {

		var vm = this;
		angular.extend(vm, {
			getFontColors: function() {
				return labelService.getSelectedLabel().Setup;
			}
		});
	}

})();