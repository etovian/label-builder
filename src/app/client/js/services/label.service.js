(function() {

	'use strict';

	angular.module('app').factory('LabelService', ['$q', '$http', LabelService]);

	function LabelService($q, $http) {

		var BASE_URL = 'dev-data/';
		var LABEL_URL = BASE_URL + 'labels.json';
		var labels = [];


		return {
			getLabels: function() {
				return labels;
			},
			getLabelById: function(id) {
				return _.findWhere(labels, {id:id});
			},
			requestLabels: function() {
				return $http.get(LABEL_URL).then(function(response) {
					labels = response.data;
				});
			}
		};
	}

})();