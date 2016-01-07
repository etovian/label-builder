(function() {

	'use strict';

	var deps = ['$q', '$http', 'NotificationService', LabelService];
	angular.module('app').factory('LabelService', deps);

	function LabelService($q, $http, notificationService) {

		var BASE_URL = 'dev-data/';
		var TEST_LABEL_URL = BASE_URL + 'labels.json';
		var EXISTING_LABELS_SUMMARY_URL = BASE_URL + 'existing.labels.summary.json';

		var existingLabelSummaries = [];
		var labels = [];
		var selectedLabel = null;
		

		return {
			deleteLabel: function(labelItemCode) {
				var deferred = $q.defer();
				var labelSummary = _.findWhere(existingLabelSummaries, {itemCode: labelItemCode});
				existingLabelSummaries = _.without(existingLabelSummaries, labelSummary);
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
			getExistingLabelSummaries: function() {
				return existingLabelSummaries;
			},
			getSelectedLabel: function() {
				return selectedLabel;
			},
			requestLabelById: function(id) {
				var deferred = $q.defer();
				var url = BASE_URL + id + '.json';
				$http.get(url).then(function(response) {
					selectedLabel = response.data.Label;
					deferred.resolve(selectedLabel);
				}, function() {
					notificationService.addError('Could not retrieve label.');
				});

				return deferred.promise;
			},
			requestLabels: function() {
				return $http.get(TEST_LABEL_URL).then(function(response) {
					labels = response.data;
				});
			},
			requestExistingLabelSummaries: function() {
				return $http.get(EXISTING_LABELS_SUMMARY_URL).then(function(response) {
						existingLabelSummaries = response.data['existing-labels'].label;
				});
			}
		};
	}

})();