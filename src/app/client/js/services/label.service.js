(function() {

	'use strict';

	angular.module('app').factory('LabelService', ['$q', '$http', LabelService]);

	function LabelService($q, $http) {

		var BASE_URL = 'dev-data/';
		var LABEL_URL = BASE_URL + 'labels.json';
		var EXISTING_LABELS_URL = BASE_URL + 'existing.labels.summary.json';

		var existing_label_summaries = [];
		
		var labels = [];

		

		return {
			getLabels: function() {
				return labels;
			},
			getLabelById: function(id) {
				return _.findWhere(labels, {id:id});
			},
			getExistingLabelSummaries: function() {
				return existing_label_summaries;
			},
			requestLabels: function() {
				return $http.get(LABEL_URL).then(function(response) {
					labels = response.data;
				});
			},
			requestExistingLabelSummaries: function() {
				return $http.get(EXISTING_LABELS_URL).then(function(response) {
						existing_label_summaries = response.data['existing-labels'].label;
				});
			}
		};
	}

})();