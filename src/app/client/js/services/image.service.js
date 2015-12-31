(function() {

	'use strict';
	var deps = ['$q', ImageService];
	angular.module('app').factory('ImageService', deps);

	function ImageService($q) {

		return {
			getImage: function(data) {

				var deferred = $q.defer();
				var image = new Image();
				image.src = data.src;
				var container = new createjs.Container();

				image.onload = function(event) {
					image = event.target;
					var bitmap = new createjs.Bitmap(image);
					container.addChild(bitmap);

					bitmap.x = data.x;
					bitmap.y = data.y;
					bitmap.rotation = data.rotation;
					bitmap.regX = bitmap.image.width / 2 | 0;
					bitmap.regY = bitmap.image.height / 2 | 0;
					bitmap.scaleX = bitmap.scaleY = bitmap.scale = data.scale;
					bitmap.name = "bmp_" + new Date();
					deferred.resolve(container);
				};

				return deferred.promise;
			}
		};
	}

})();