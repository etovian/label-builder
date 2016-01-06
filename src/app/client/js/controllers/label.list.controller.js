(function() {
	
	'use strict';

	var deps = ['LabelService', LabelListController];

	angular.module('app').controller('LabelListController', deps);

	function LabelListController(labelService) {

		var vm = this;
		angular.extend(vm, {
			gridOptions: {
				columnDefs: [ //https://github.com/angular-ui/ui-grid/wiki/Defining-columns
					{
						displayName: 'Item Code',
						field: 'itemCode'
					}, {
						displayName: 'Description',
						field: 'productName'
					}, {
						displayName: 'Brand',
						field: 'brandCode'
					}, {
						displayName: 'version',
						field: 'versionMajor'
					}, {
						displayName: 'Status',
						field: 'status'
					}, {
						displayName: 'Owner',
						field: 'owner'
					}, {
						displayName: 'Modified',
						field: 'lastModified'
					}, {
						displayName: 'By',
						field: 'modifier'
					}, {
						displayName: 'Launch',
						field: 'launched'
					}
				],
				data: [],
				enableRowSelection: true,
				enableRowHeaderSelection: false,
				multiSelect: false,
				noUnselect: true,
				onRegisterApi: function(gridApi) {
					vm.gridApi = gridApi;
					gridApi.selection.on.rowSelectionChanged(null, function(row) {
						vm.setSelectedLabel(row.entity);
					});
				}
			},
			getExistingLabelSummaries: function() {
				return labelService.getExistingLabelSummaries();
			},
			setSelectedLabel: function(label) {
				console.log(label);
			}
		});

		labelService.requestExistingLabelSummaries().then(function() {
			vm.gridOptions.data = labelService.getExistingLabelSummaries();
		});
	}
})();