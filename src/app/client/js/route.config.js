(function() {
	'use strict';

	angular
		.module('app')
		.config(['$routeProvider', Config]);

	function Config($routeProvider) {

		var templatesPath = 'templates/';

		$routeProvider
			.when('/welcome', {
				templateUrl: templatesPath + 'welcome.html',
				controller: 'WelcomeController',
				controllerAs: 'vm'
			})
			.when('/label-list', {
				templateUrl: templatesPath + 'label-list.html',
				controller: 'LabelListController',
				controllerAs: 'vm'
			})
			.when('/label-add', {
				templateUrl: templatesPath + 'label-add.html',
				controller: 'LabelAddController',
				controllerAs: 'vm'
			})
			.when('/label-edit', {
				templateUrl: templatesPath + 'label-edit.html',
				controller: 'LabelEditController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/welcome'
			});
			
	}

})();