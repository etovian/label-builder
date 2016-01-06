(function() {
	'use strict';

	angular.module('app').directive('trhMainMenu', MainMenuDirective);

	function MainMenuDirective() {
		return {
			scope: {

			},
			templateUrl: 'directives/main.menu.html',
			controller: ['navigationService', '$location', MainMenuDirectiveController],
			controllerAs: 'vm',
			bindToController: true
		};
	}

	function MainMenuDirectiveController(navigationService, $location) {

		var vm = this;
		angular.extend(vm, {
			items: [
				{
					text: 'Home',
					href: '#/welcome'
				}, {
					text: 'Start',
					href: '#/label-list'
				}, {
					text: 'Choose Container',
					href: '#/container'
				}, {
					text: 'Choose Content',
					href: '#/content'
				}, {
					text: 'Ingredients and Text',
					href: '#/ingredients'
				}, {
					text: 'Review and Submit',
					href: '#/review'
				}
			],
			getCssClass: function(item) {
				var cssClass = '';
				var adjustedHref = item.href.replace('#', '');
				if(adjustedHref === $location.path()) {
					cssClass = "active";
				}
				return cssClass;
			}
		});
	}

})();