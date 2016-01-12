(function() {

	'use strict';

	var deps = [PositioningService];
	angular.module('app').factory('PositioningService', deps);

	function PositioningService() {

		return {

			above: function(placeObject, aboveObject) {
				angular.extend(placeObject, {
					x: aboveObject.x,
					y: aboveObject.y - placeObject.getBounds().height
				});
				this.addToParent(aboveObject, placeObject);
			},
			addToParent: function(childObject, newSiblingObject) {
				childObject.parent.addChild(newSiblingObject);
			},
			beneath: function(placeObject, beneathObject) {
				angular.extend(placeObject, {
					x: beneathObject.x,
					y: beneathObject.getBounds().height + beneathObject.y
				});
				this.addToParent(beneathObject, placeObject);
			},
			centerIn: function(placeObject, inObject) {

			},
			toLeftOf: function(placeObject, toLeftOfObject) {
				angular.extend(placeObject, {
					x: toLeftOfObject.x - placeObject.getBounds().width,
					y: toLeftOfObject.y
				});
				this.addToParent(toLeftOfObject, placeObject);
			},
			toRightOf: function(placeObject, toRightOfObject) {
				angular.extend(placeObject, {
					x: toRightOfObject.x + toRightOfObject.getBounds().width,
					y: toRightOfObject.y
				});
				this.addToParent(toRightOfObject, placeObject);
			}
		};
	}

})();