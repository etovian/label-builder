(function() {

	'use strict';

	angular.module('app').directive('nutraLbCanvas', [LabelBuilderCanvasDirective]);

	function LabelBuilderCanvasDirective() {

		return {
			scope: {
				nutraLabel: '='
			},
			templateUrl: 'directives/label-builder-canvas.html',
			controller: ['LabelComponentService', '$q', LabelBuilderCanvasDirectiveController],
			controllerAs: 'vm',
			bindToController: true,
			link: link,
			replace: true
		};
	}

	function link(scope, element, attribute) {
		var stage;
		if(scope.stage) {

			stage = scope.stage;
			scope.stage.removeAllChildren();
			scope.stage.update();
		} else {
			stage = scope.stage = new createjs.Stage(element[0]);
		}

		stage.autoClear = true;
		scope.vm.stage = stage;
	}

	function LabelBuilderCanvasDirectiveController(labelComponentService, $q) {
		var vm = this;
		angular.extend(vm, {
			update: true,
			render: function() {
				if(vm.stage && vm.nutraLabel) {

					vm.stage.removeAllChildren(); //repaints make elements fuzzy if existing elements are not removed

					function iterate(componentData) {

						$q.resolve(labelComponentService.getComponent(componentData)).then(function(component) {
							vm.stage.addChild(component);
							vm.stage.update();
						});
					}

					vm.nutraLabel.components.forEach(iterate);
				}
			},
			tick: function(event) {
				if(vm.stage  && vm.update) {
					vm.render();
					// vm.render();
					vm.update = false;
				}
			}
		});

		var ticker = createjs.Ticker;
		ticker.timingMode = createjs.Ticker.RAF;
		ticker.addEventListener("tick", vm.tick);
		
	}

})();