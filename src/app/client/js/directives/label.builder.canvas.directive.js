(function() {

	'use strict';

	angular.module('app').directive('nutraLbCanvas', [LabelBuilderCanvasDirective]);

	function LabelBuilderCanvasDirective() {

		return {
			scope: {
				nutraLabel: '='
			},
			templateUrl: 'directives/label-builder-canvas.html',
			controller: [LabelBuilderCanvasDirectiveController],
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

	function LabelBuilderCanvasDirectiveController() {
		var vm = this;
		angular.extend(vm, {
			render: function() {
				if(vm.stage) {
					vm.stage.removeAllChildren(); //repaints make elements fuzzy if existing elements are not removed
					var circle = new createjs.Shape();
					circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 100);
					circle.x = 100;
					circle.y = 100;
					vm.stage.addChild(circle);

					var text = new createjs.Text(vm.nutraLabel.text, "36px Arial", "#777");
					text.x = 350;
					text.y = 200;
					vm.stage.addChild(text);
				}
			},
			tick: function(event) {
				if(vm.stage) {
					vm.render();
					vm.stage.update(event);
				}
			}
		});

		var ticker = createjs.Ticker;
		ticker.timingMode = createjs.Ticker.RAF;
		ticker.addEventListener("tick", vm.tick);
		
	}

})();