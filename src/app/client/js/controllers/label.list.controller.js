(function() {
	
	'use strict';

	var deps = ['LabelService', LabelListController];

	angular.module('app').controller('LabelListController', deps);

	function LabelListController(labelService) {

		var vm = this;
		angular.extend(vm, {

			getExistingLabelSummaries: function() {
				return labelService.getExistingLabelSummaries();
			}
		});

		labelService.requestExistingLabelSummaries();
	}
})();