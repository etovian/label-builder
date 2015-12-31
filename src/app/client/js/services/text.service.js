(function() {

	'use strict';
	var deps = [TextService];
	angular.module('app').factory('TextService', deps);

	function TextService() {

		return {
			getText: function(data) {

				var text = new createjs.Text(data.text, data.font, data.color);
				text.x = data.x;
				text.y = data.y;
				text.rotation = data.rotation;
				return text;
			}
		};
	}

})();