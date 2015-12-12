(function() {
	angular.module('app', ['ngRoute', 'templates', 'ui.bootstrap', 'ngAside']);
	angular.module('templates', []); //necessary for now, because gulp-angular-templatecache won't put them in 'app'
})();

