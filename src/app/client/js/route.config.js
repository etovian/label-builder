(function() {
	'use strict';

	angular
		.module('app')
		.config(['$routeProvider', Config]);

	function Config($routeProvider) {

		var templatesPath = 'templates/';

		function labelsPrepService(LabelService) {
			return LabelService.requestLabels();
		}

		function existingLabelsPrepService(LabelService) {
			return LabelService.requestExistingLabelSummaries();
		}

		function selectedLabelPrepService(LabelService, $route) {
			return LabelService.requestLabelById($route.current.params.labelId);
		}
		
		$routeProvider
			.when('/welcome', {
				templateUrl: templatesPath + 'welcome.html',
				controller: 'WelcomeController',
				controllerAs: 'vm'
			})
			.when('/label-list', {
				templateUrl: templatesPath + 'label-list.html',
				controller: 'LabelListController',
				controllerAs: 'vm',
				resolve: {
					existingLabelsPrepService: existingLabelsPrepService
				}
			})
			.when('/label-add', {
				templateUrl: templatesPath + 'label-add.html',
				controller: 'LabelAddController',
				controllerAs: 'vm',
				resolve: {
					labelsPrepService: labelsPrepService
				}
			})
			.when('/ingredients', {
				templateUrl: templatesPath + 'ingredients.html',
				controller: 'IngredientsController',
				controllerAs: 'vm'
			})
			.when('/ingredients/labelId/:labelId', {
				templateUrl: templatesPath + 'ingredients.html',
				controller: 'IngredientsController',
				controllerAs: 'vm',
				resolve: {
					selectedLabelPrepService: selectedLabelPrepService
				}
			})
			.when('/label-edit', {
				templateUrl: templatesPath + 'label-edit.html',
				controller: 'LabelEditController',
				controllerAs: 'vm',
				resolve: {
					labelsPrepService: labelsPrepService
				}
			})
			.otherwise({
				redirectTo: '/welcome'
			});
			
	}

})();