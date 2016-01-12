(function() {

	var deps = [
		'ngRoute', 
		'templates', 
		'ui.bootstrap', 
		'ngAside', 
		'ui.grid', 
		'ui.grid.selection',
		'ui.grid.resizeColumns'
	];

	angular.module('app', deps);
	angular.module('templates', []); //necessary for now, because gulp-angular-templatecache won't put them in 'app'
})();

