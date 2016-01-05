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
		var canvas = element.find('canvas')[0];
		if(scope.stage) {

			stage = scope.stage;
			scope.stage.removeAllChildren();
			scope.stage.update();
		} else {
			stage = scope.stage = new createjs.Stage(canvas);
		}

		
		stage.autoClear = true;
		angular.extend(scope.vm, {
			stage: stage,
			canvas: canvas,
			canvasContext: canvas.getContext('2d')
		});
	}

	function LabelBuilderCanvasDirectiveController(labelComponentService, $q) {
		var vm = this;
		angular.extend(vm, {
			dragStart: null,
			isMousedown: false,
			offset: {
				x: 0,
				y: 0
			},
			scale: 1,
			update: true,
			getEventOffsetX: function($event) {
				return $event.offsetX || ($event.pageX - vm.canvas.offsetLeft);
			},
			getEventOffsetY: function($event) {
				return $event.offsetY || ($event.pageY - vm.canvas.offsetTop);
			},
			mousedown: function($event) {
				vm.isMousedown = true;
    			var lastX = vm.getEventOffsetX($event);
      			var lastY = vm.getEventOffsetY($event);
      			vm.dragStart = {
      				x: lastX,
      				y: lastY
      			};
			},
			mouseleave: function($event) {
				if(vm.isMousedown) {
					vm.isMousedown = false;
					vm.updateOffset($event);
				}
			},
			mousemove: function($event) {
				if(vm.isMousedown) {
					vm.update = true;
          			var lastX = vm.getEventOffsetX($event);
      				var lastY = vm.getEventOffsetY($event);
          			var offsetX = (lastX - vm.dragStart.x) * -1;
          			var offsetY = (lastY - vm.dragStart.y) * -1;
          			vm.stage.regX = offsetX + vm.offset.x;
          			vm.stage.regY = offsetY + vm.offset.y;
				}
			},
			mouseup: function($event) {
				vm.update = false;
				vm.isMousedown = false;
				vm.updateOffset($event);
			},
			render: function() {
				if(vm.stage && vm.nutraLabel) {

					vm.stage.removeAllChildren(); //repaints make elements fuzzy if existing elements are not removed

					function iterate(componentData) {

						$q.resolve(labelComponentService.getComponent(componentData)).then(function(component) {
							vm.stage.addChild(component);
							vm.stage.scaleX = vm.scale;
							vm.stage.scaleY = vm.scale;
							vm.stage.update();
						});
					}

					vm.nutraLabel.components.forEach(iterate);
				}
			},
			tick: function(event) {
				if(vm.stage  && vm.update) {
					vm.render();
					vm.update = false;
				}
			},
			updateOffset: function($event) {
				var lastX = vm.getEventOffsetX($event);
      			var lastY = vm.getEventOffsetY($event);
      			var offsetX = (lastX - vm.dragStart.x) * -1;
      			var offsetY = (lastY - vm.dragStart.y) * -1;
      			vm.offset.x += offsetX;
      			vm.offset.y += offsetY;	
			}
		});

		var ticker = createjs.Ticker;
		ticker.timingMode = createjs.Ticker.RAF;
		ticker.addEventListener("tick", vm.tick);
		
	}

})();