(function() {

	'use strict';

	angular.module('app').directive('nutraLbCanvas', [LabelBuilderCanvasDirective]);

	function LabelBuilderCanvasDirective() {

		return {
			scope: {
				nutraLabel: '='
			},
			templateUrl: 'directives/label-builder-canvas.html',
			controller: ['LabelComponentService', '$q', 'StaticDataService', 'NotificationService', LabelBuilderCanvasDirectiveController],
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

	function LabelBuilderCanvasDirectiveController(labelComponentService, $q, staticDataService, notificationService) {
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
			zoomOptions: staticDataService.getZoomOptions(),
			getDefaultZoom: function() {
				return vm.zoomOptions[2]; //TODO: make this less yucky.
			},
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
          			vm.stage.regX = Math.round((offsetX + vm.offset.x) / vm.scale.value);
          			vm.stage.regY = Math.round((offsetY + vm.offset.y) / vm.scale.value);
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
							vm.stage.update();
						});
					}

					vm.nutraLabel.components.forEach(iterate);
				}
			},
			resetView: function() {
				angular.extend(vm.stage, {
					regX: 0,
					regY: 0,
				});

				vm.scale = vm.getDefaultZoom();
				vm.zoom(vm.scale.value);

				angular.extend(vm.offset, {
					x: 0,
					y: 0
				});
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
			},
			zoom: function(factor) {
				vm.stage.scaleX = factor;
				vm.stage.scaleY = factor;
				vm.stage.update();
				return factor;
			},
			zoomIn: function() {
				var currIndex = vm.zoomOptions.indexOf(vm.scale);
				var nextIndex = ++currIndex;
				var zoomLevel = vm.zoomOptions[nextIndex];
				if(zoomLevel) {
					vm.scale = vm.zoomOptions[nextIndex];
					vm.zoom(vm.scale.value);
				} else {
					notificationService.addError("You have achieved maximum zoominess.");
				}
			},
			zoomOut: function() {
				var currIndex = vm.zoomOptions.indexOf(vm.scale);
				var nextIndex = --currIndex;
				if(nextIndex >= 0) {
					var zoomLevel = vm.zoomOptions[nextIndex];
					vm.scale = vm.zoomOptions[nextIndex];
					vm.zoom(vm.scale.value);
				} else {
					notificationService.addError("You have achieved minimum zoominess.");
				}
			}
		});

		vm.scale = vm.getDefaultZoom(); //TODO: make this less yucky.

		var ticker = createjs.Ticker;
		ticker.timingMode = createjs.Ticker.RAF;
		ticker.addEventListener("tick", vm.tick);
		
	}

})();