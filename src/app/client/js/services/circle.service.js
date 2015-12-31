(function() {

	'use strict';

	var deps = [CircleService];
	angular.module('app').factory('CircleService', deps);

	function CircleService() {

		return {
			getCircle: function(data) {

				var circle = new createjs.Shape();
				circle.graphics
					.beginFill(data.color)
					.drawCircle(data.x, data.y, data.radius);
				return circle;
			}
		};
	}

})();