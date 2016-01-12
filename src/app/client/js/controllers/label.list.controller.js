(function() {
	
	'use strict';

	var deps = ['LabelService', 'NavigationService', 'NotificationService', LabelListController];

	angular.module('app').controller('LabelListController', deps);

	function LabelListController(labelService, navigationService, notificationService) {

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
						displayName: 'Version',
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
				data: labelService.getExistingLabelSummaries(), //[],
				enableFiltering: true,
				enableRowSelection: true,
				enableRowHeaderSelection: false,
				multiSelect: false,
				noUnselect: true,
				onRegisterApi: function(gridApi) {
					vm.gridApi = gridApi;
					gridApi.selection.on.rowSelectionChanged(null, function(row) {
						vm.setSelectedLabelSummary(row.entity);
					});
				}
			},
			itemCode: '',
			searchCriteria: {
				type: "active",
				approved: false
			},
			selectedLabelSummary: null,
			deleteSelectedLabel: function() {
				console.log('deleteSelectedLabel');
				labelService.deleteLabel(vm.selectedLabelSummary.itemCode).then(function() {
					vm.gridOptions.data = vm.getExistingLabelSummaries();
				});
			},
			getExistingLabelSummaries: function() {
				return labelService.getExistingLabelSummaries();
			},
			navigateByItemCode: function() {
				console.log('navigateByItemCode');
			},
			navigateToSelectedLabel: function() {
				labelService.requestLabelById(vm.selectedLabelSummary.labelId).then(function() {
					navigationService.goToIngredients();
				});
			},
			setSelectedLabelSummary: function(labelSummary) {
				vm.selectedLabelSummary = labelSummary;
			}
		});
	}
})();