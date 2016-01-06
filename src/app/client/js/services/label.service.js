(function() {

	'use strict';

	var deps = ['$q', '$http', 'NotificationService', LabelService];
	angular.module('app').factory('LabelService', deps);

	function LabelService($q, $http, notificationService) {

		var BASE_URL = 'dev-data/';
		var LABEL_URL = BASE_URL + 'labels.json';
		var EXISTING_LABELS_URL = BASE_URL + 'existing.labels.summary.json';

		var existing_label_summaries = [];
		
		var labels = [];

		

		return {
			deleteLabel: function(labelItemCode) {
				var deferred = $q.defer();
				var labelSummary = _.findWhere(existing_label_summaries, {itemCode: labelItemCode});
				existing_label_summaries = _.without(existing_label_summaries, labelSummary);
				deferred.resolve(labelSummary);
				notificationService.add({
					title: 'Label Deleted',
					text: labelSummary.productName + ' was deleted.',
					type: notificationService.NOTIFICATION_TYPES.DANGER
				});
				return deferred.promise;
			},
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