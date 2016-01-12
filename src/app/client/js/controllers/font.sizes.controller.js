(function() {

	'use strict';

	var deps = ['$uibModalInstance', 'LabelService', FontSizesController];
	angular.module('app').controller('FontSizesController', deps);

	function FontSizesController($uibModalInstance, labelService) {
		var vm = this;
		angular.extend(vm, {
			getFontSizes: function() {
				return labelService.getSelectedLabel().Setup;
			}
		});
	}

})();