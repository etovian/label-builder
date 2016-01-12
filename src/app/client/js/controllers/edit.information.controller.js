(function() {

	'use strict';

	var deps = [
		'$uibModal',
		'LabelService',
		EditInformationController
	];
	angular.module('app').controller('EditInformationController', deps);

	function EditInformationController($uibModal, labelService) {
		
		var vm = this;
		angular.extend(vm, {
			getSelectedLabel: function() {
				return labelService.getSelectedLabel();
			}
		});
	}

})();