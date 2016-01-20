(function() {

	'use strict';

	function PercentageFilter($filter) {

		return function(input, decimals) {
			return $filter('number')(input * 100, decimals) + '%';
		};
	}

	var deps = ['$filter', PercentageFilter];
	angular.module('app').filter('percentage', deps);
}());