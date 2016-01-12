(function() {

	'use strict';

	var deps = [ContainerService];
	angular.module('app').factory('ContainerService', deps);

	function ContainerService() {

		return {

			getContainer: function() {
				return new createjs.Container();
			},
			setBorder: function(container, border) {
				var bounds = container.getBounds();
				var borderRect = new createjs.Shape();
				borderRect.graphics
					.setStrokeStyle(border.width)
					.beginStroke(border.color)
					.drawRect(0, 0, bounds.width, bounds.height);

				container.addChild(borderRect);
			}
		};
	}

})();