(function() {

	'use strict';

	angular.module('app').controller('LabelAddController', ['NotificationService', LabelAddController]);

	function LabelAddController(notificationService) {

		var vm = this;

		angular.extend(vm, {
			label: {
				text: 'Howdy!',
				components: [

				]
			}
		});

		notificationService.add({
			text: 'Let\'s add some labels,  yo!',
			title: 'Label Builder',
			type: notificationService.NOTIFICATION_TYPES.INFO
		});
	}

})();