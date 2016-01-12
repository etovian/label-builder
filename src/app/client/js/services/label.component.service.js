(function() {

	'use strict';

	var deps = [
		'BackPanelService',
		'CircleService', 
		'ImageService',
		'RectangleService',
		'TextService',
		LabelComponentService
	];
	angular.module('app').factory('LabelComponentService', deps);

	function LabelComponentService(backPanelService, circleService, imageService, rectangleService, textService) {

		return {
			getCircle: function(data) {
				return circleService.getCircle(data);
			},
			getComponent: function(componentData) {
				var map = {
					'circle': this.getCircle,
					'image': this.getImage,
					'rectangle': this.getRectangle,
					'text': this.getText
				};

				return map[componentData.type](componentData);
			},
			getImage: function(data) {
				return imageService.getImage(data);
			},
			getRectangle: function(data) {
				return rectangleService.getRectangle(data);
			},
			getText: function(data) {
				return textService.getText(data);
			},
			getBackPanel: function(data) {
				return backPanelService.getComponent(data);
			}
		};
	}

})();