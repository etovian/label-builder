angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("directives/label-builder-canvas.html","<!DOCTYPE html><canvas width=1000 height=500></canvas>");
$templateCache.put("directives/main.menu.html","<!DOCTYPE html><nav class=\"navbar navbar-default navbar-fixed-top\"><div class=container-fluid><div class=navbar-header><a class=navbar-brand href=#/play>Label Builder</a></div><div><ul class=\"nav navbar-nav\"><li class=dropdown><a class=dropdown-toggle data-toggle=dropdown role=button aria-expanded=false><span>Labels</span> <span class=caret></span></a><ul class=dropdown-menu role=menu><li><a href=#/label-list style=\"cursor: pointer;\">Search</a></li><li><a href=#/label-add style=\"cursor: pointer;\">Add</a></li></ul></li><li class=dropdown><a class=dropdown-toggle data-toggle=dropdown role=button aria-expanded=false><span>Admin</span> <span class=caret></span></a><ul class=dropdown-menu role=menu><li><a style=\"cursor: pointer;\">Users</a></li></ul></li></ul></div></div></nav>");
$templateCache.put("templates/confirm.delete.sidebar.html","<p>{{ vm.message }}</p><div class=btn-group><button ng-click=vm.cancel() class=\"btn btn-danger\">Cancel</button> <button ng-click=vm.confirm() class=\"btn btn-default\">Confirm</button></div>");
$templateCache.put("templates/label-add.html","<!DOCTYPE html><div container-fluid><div class=row><div class=col-md-12><input ng-model=vm.label.text type=text></div></div><div class=row ng-repeat=\"label in vm.getLabels()\"><div class=col-md-12><nutra-lb-canvas nutra-label=label></nutra-lb-canvas></div></div></div>");
$templateCache.put("templates/welcome.html","Welcome to Label Builder!");}]);