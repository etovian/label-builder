(function() {

	'use strict';

	var deps = [
		'CircleService', 
		'ImageService',
		'TextService',
		LabelComponentService
	];
	angular.module('app').factory('LabelComponentService', deps);

	function LabelComponentService(circleService, imageService, textService) {

		return {
			getCircle: function(data) {
				return circleService.getCircle(data);
			},
			getComponent: function(componentData) {
				var map = {
					'circle': this.getCircle,
					'image': this.getImage,
					'text': this.getText
				};

				return map[componentData.type](componentData);
			},
			getImage: function(data) {
				return imageService.getImage(data);
			},
			getText: function(data) {
				return textService.getText(data);
			}
		};
	}

})();