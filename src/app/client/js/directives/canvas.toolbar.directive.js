(function() {

	'use strict';

	angular.module('app').directive('canvasToolbar', [CanvasToolbarDirective]);

	function CanvasToolbarDirective() {

		var controller = [
			'$aside',
			CanvasToolbarDirectiveController
		];

		return {
			scope: {
				nutraLabel: '=',
				goRenderedLabel: '=',
				goDiagram: '='
			},
			templateUrl: 'directives/canvas.toolbar.html',
			controller: controller,
			controllerAs: 'vm',
			bindToController: true,
			// link: link,
			replace: true
		};

		function CanvasToolbarDirectiveController($aside) {

			var vm = this;
			angular.extend(vm, {

				openEditInformationModal: function() {
					var opts = {
						templateUrl: 'templates/' + 'edit.information.html',
						controller: 'EditInformationController',
						controllerAs: 'vm',
						placement: 'right',
						size: 'sm'
					};

					$aside.open(opts);
				},
				openFontColorsModal: function() {
					var opts = {
						templateUrl: 'templates/' + 'font.colors.html',
						controller: 'FontColorsController',
						controllerAs: 'vm',
						placement: 'right',
						size: 'md'
					};

					$aside.open(opts);
				},
				openFontSizesModal: function() {
					var opts = {
						templateUrl: 'templates/' + 'font.sizes.html',
						controller: 'FontSizesController',
						controllerAs: 'vm',
						placement: 'right',
						size: 'md'
					};

					$aside.open(opts);
				},
				toggleRotation: function() {
					if(vm.goRenderedLabel.angle === 0) {
						vm.goRenderedLabel.angle = 270;
					} else {
						vm.goRenderedLabel.angle = 0;
					}
				}
			});
		}
	}
})();