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

	function LabelBuilderCanvasDirectiveController(doo) {
		var vm = this;
		angular.extend(vm, {
			update: true,
			render_old: function() {
				if(vm.stage) {

					vm.stage.removeAllChildren(); //repaints make elements fuzzy if existing elements are not removed

					function iterate(component) {

						var circle = new createjs.Shape();
						circle.graphics
							.beginFill(component.color)
							.drawCircle(component.x, component.y, component.radius);

						vm.stage.addChild(circle);
					}

					vm.nutraLabel.components.forEach(iterate);

					var text = new createjs.Text(vm.nutraLabel.text, "36px Arial", "#777");
					text.x = 20;
					text.y = 40;
					
					vm.stage.addChild(text);
				}
			},
			render: function() {

				var image = new Image();
				image.src = 'src/app/client/images/movember.png';
				
				var bitmap;
				var container = new createjs.Container();
				vm.stage.addChild(container);
				
				image.onload = function(event) {

					var image = event.target;

					for (var i = 0; i < 10; i++) {
						var bitmap = new createjs.Bitmap(image);
						container.addChild(bitmap);
						bitmap.x = vm.stage.canvas.width * Math.random() | 0;
						bitmap.y = vm.stage.canvas.height * Math.random() | 0;
						bitmap.rotation = 360 * Math.random() | 0;
						bitmap.regX = bitmap.image.width / 2 | 0;
						bitmap.regY = bitmap.image.height / 2 | 0;
						bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random() * 0.4 + 0.6;
						bitmap.name = "bmp_" + i;
						bitmap.cursor = "grabbing";

						bitmap.on("mousedown", function (evt) {
							this.parent.addChild(this);
							this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
						});

						bitmap.on("pressmove", function (evt) {
							this.x = evt.stageX + this.offset.x;
							this.y = evt.stageY + this.offset.y;
							// indicate that the stage should be updated on the next tick:
							// vm.update = true;
							vm.stage.update();
						});
					}

					vm.stage.update(event);
					// vm.update = false;
				};
			},
			tick: function(event) {
				if(vm.stage  && vm.update) {
					vm.render_old();
					vm.render();
					vm.update = false;
				}
			}
		});

		var ticker = createjs.Ticker;
		ticker.timingMode = createjs.Ticker.RAF;
		ticker.addEventListener("tick", vm.tick);
		
	}

})();