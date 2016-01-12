(function() {

	'use strict';

	var deps = [RectangleService];
	angular.module('app').factory('RectangleService', deps);

	function RectangleService() {

		return {

			getRectangle: function(data) {

				var rectangle = new createjs.Shape();
				rectangle.graphics
					.beginFill(data.color)
					.drawRect(data.x, data.y, data.width, data.height);
				rectangle.rotation = data.rotation;
				rectangle.x = data.x;
				rectangle.y = data.y;
				rectangle.setBounds(data.x, data.y, data.width, data.height);
				return rectangle;
			}
		};
	}

})();