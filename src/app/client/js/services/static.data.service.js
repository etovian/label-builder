(function() {

	'use strict';

	var deps = [StaticDataService];
	angular.module('app').factory('StaticDataService', deps);

	function StaticDataService() {

		return {
			getZoomOptions: function() {

				var min = 0.5;
				var step = 0.25;
				var max = 3;
				var values = [];
				for(var i = min; i <= max; i += step) {
					var value = {
						value: i,
						label: (i * 100) + '%'
					};
					values.push(value);
				}

				return values;
			}
		};
	}

})();