(function() {
	'use strict';

	function MainMenuDirectiveController($location) {

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
				// if($location.path().indexOf(adjustedHref) > 0) {
					cssClass = "active";
				}
				return cssClass;
			}
		});
	}

	function MainMenuDirective() {
		return {
			scope: {

			},
			templateUrl: 'directives/main.menu.html',
			controller: ['$location', MainMenuDirectiveController],
			controllerAs: 'vm',
			bindToController: true
		};
	}

	angular.module('app').directive('trhMainMenu', MainMenuDirective);
}());