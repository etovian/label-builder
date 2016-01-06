(function() {

	'use strict';

	var deps = ['NotificationService', 'LabelService', LabelAddController];
	angular.module('app').controller('LabelAddController', deps);

	function LabelAddController(notificationService, labelService) {

		var vm = this;

		angular.extend(vm, {
			getLabel: function(id) {
				return labelService.getLabelById(id);
			},
			getLabels: function() {
				return labelService.getLabels();
			}
		});

		notificationService.add({
			text: 'Let\'s add some labels!',
			title: 'Label Builder',
			type: notificationService.NOTIFICATION_TYPES.INFO
		});
	}

})();