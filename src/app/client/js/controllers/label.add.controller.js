(function() {

	'use strict';

	angular.module('app').controller('LabelAddController', ['NotificationService', LabelAddController]);

	function LabelAddController(notificationService) {

		var vm = this;

		angular.extend(vm, {
			label: {
				text: 'Howdy!',
				components: [
					{
						type: 'circle',
						x: 100,
						y: 100,
						radius: 100,
						color: '#30d23a'
					},
					{
						type: 'circle',
						x: 150,
						y: 150,
						radius: 75,
						color: '#a32323'
					},
					{
						type: 'circle',
						x: 200,
						y: 200,
						radius: 50,
						color: '#2742b4'
					},
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