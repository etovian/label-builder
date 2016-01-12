(function() {

	'use strict';

	angular.module('app').directive('nutraLbCanvas', [LabelBuilderCanvasDirective]);

	function LabelBuilderCanvasDirective() {

		var controller = [
			'LabelComponentService', 
			'$q', 
			'StaticDataService', 
			'NotificationService', 
			'$aside',
			LabelBuilderCanvasDirectiveController
		];

		return {
			scope: {
				nutraLabel: '='
			},
			templateUrl: 'directives/label-builder-canvas.html',
			controller: controller,
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

	function LabelBuilderCanvasDirectiveController(labelComponentService, $q, staticDataService, notificationService, $aside) {
		var vm = this;
		angular.extend(vm, {
			dragStart: null,
			renderedLabel: null,
			isMousedown: false,
			offset: {
				x: 0,
				y: 0
			},
			rotation: 0,
			scale: 1,
			update: true,
			zoomInput: 100,
			zoomOptions: staticDataService.getZoomOptions(),
			centerOnRenderedLabel: function() {
				var stageBounds = vm.stage.getBounds();
				var stageWidth = stageBounds.width;
				var stageHeight = stageBounds.height;
				var labelBounds = vm.renderedLabel.getBounds();
				var labelWidth = labelBounds.width;
				var labelHeight = labelBounds.height;
				var canvasWidth = vm.canvas.width;
				var canvasHeight = vm.canvas.height;

				var offsetX = (canvasWidth - Math.round((labelWidth / 2))) * -1;
				var offsetY = (canvasHeight - Math.round((labelHeight / 2))) * -1;

				angular.extend(vm.stage, {
					regX: offsetX,
					regY: offsetY
				});

				// vm.clearOffset();
				angular.extend(vm.offset, {
					x: vm.offset.x + offsetX,
					y: vm.offset.y + offsetY
				});

				vm.stage.update();
			},
			clearOffset: function() {
				angular.extend(vm.offset, {
					x: 0,
					y: 0
				});
			},
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
			render: function() {
				
				if(vm.stage && vm.nutraLabel) {

					vm.stage.removeAllChildren(); //repaints make elements fuzzy if existing elements are not removed
					$q.resolve(labelComponentService.getBackPanel(vm.nutraLabel)).then(function(backPanel) {
						vm.renderedLabel = backPanel;
						vm.stage.addChild(backPanel);
						vm.stage.update();
					});
					
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
			toggleRotation: function() {
				if(vm.renderedLabel.rotation === 0) {
					vm.renderedLabel.rotation = -90;
				} else {
					vm.renderedLabel.rotation = 0;
				}
				// vm.centerOnRenderedLabel();
				vm.stage.update();
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
				// vm.stage.scaleX = factor;
				// vm.stage.scaleY = factor;
				// vm.stage.update();
				// return factor;
				vm.renderedLabel.scaleX = factor;
				vm.renderedLabel.scaleY = factor;
				vm.stage.update();
				return factor;
			},
			zoomInputChange: function() {
				var factor = vm.zoomInput / 100;
				vm.zoom(factor);
			},
		});

		vm.scale = vm.getDefaultZoom(); //TODO: make this less yucky.

		var ticker = createjs.Ticker;
		ticker.timingMode = createjs.Ticker.RAF;
		ticker.addEventListener("tick", vm.tick);
		
	}

})();