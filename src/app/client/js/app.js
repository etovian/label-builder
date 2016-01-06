(function() {
	angular.module('app', ['ngRoute', 'templates', 'ui.bootstrap', 'ngAside', 'ui.grid', 'ui.grid.selection']);
	angular.module('templates', []); //necessary for now, because gulp-angular-templatecache won't put them in 'app'
})();

