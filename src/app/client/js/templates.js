angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("directives/label-builder-canvas.html","<!DOCTYPE html><div class=container-fluid><div class=row><div class=col-md-12><canvas ng-mousedown=vm.mousedown($event) ng-mouseleave=vm.mouseleave($event) ng-mousemove=vm.mousemove($event) ng-mouseup=vm.mouseup($event) width=1000 height=500></canvas></div><div class=col-md-12><div class=btn-group><button ng-click=vm.zoomIn() class=\"btn btn-default\"><span class=\"glyphicon glyphicon-zoom-in\"></span></button> <button ng-click=vm.zoomOut() class=\"btn btn-default\"><span class=\"glyphicon glyphicon-zoom-out\"></span></button> <button ng-click=vm.resetView() class=\"btn btn-default\">Reset</button> <label>Zoom: {{vm.scale.label}}</label></div></div></div></div>");
$templateCache.put("directives/main.menu.html","<!DOCTYPE html><ul class=\"nav nav-pills\"><li><a href=#/welcome>Home</a></li><li><a href=#/label-list>Start</a></li><li><a href=#/container>Choose Container</a></li><li><a href=#/content>Choose Content</a></li><li><a href=#/ingredients>Ingredients and Text</a></li><li><a href=#/review>Review and Submit</a></li></ul>");
$templateCache.put("templates/confirm.delete.sidebar.html","<p>{{ vm.message }}</p><div class=btn-group><button ng-click=vm.cancel() class=\"btn btn-danger\">Cancel</button> <button ng-click=vm.confirm() class=\"btn btn-default\">Confirm</button></div>");
$templateCache.put("templates/label-add.html","<!DOCTYPE html><div container-fluid><div class=row ng-repeat=\"label in vm.getLabels()\"><div class=col-md-12><nutra-lb-canvas nutra-label=label></nutra-lb-canvas></div></div></div>");
$templateCache.put("templates/label-list.html","<!DOCTYPE html><div class=container-fluid><div class=row><div class=col-md-12><h1>Create or open a label:</h1><p>Type an item code and click Create/Open. If a label doesn\'t exist for that code, you can create one. Otherwise, the existing label will be opened.</p></div></div><div class=row><div class=col-md-12><form action class=form-inline><div class=form-group><div class=input-group><div class=input-group-addon>Item Code:</div><input ng-model=vm.itemCode type=text class=form-control> <span class=input-group-btn><button ng-click=vm.navigateByItemCode() class=\"btn btn-default\">Create / Open</button></span></div></div></form></div></div><div class=row><div class=col-md-12><div class=pull-left><h1>Open an active label:</h1></div></div></div><div class=row><div class=col-md-12><form class=\"inline-form pull-right\"><div class=form-group><label class=radio-inline><input type=radio name=labelOptions> Active Labels</label> <label class=radio-inline><input type=radio name=labelOptions> Deleted Labels</label></div></form></div></div><div class=row><div class=col-md-12><div ui-grid=vm.gridOptions ui-grid-selection ui-grid-resize-columns></div></div></div><div class=row><div class=col-md-6><div class=checkbox><input type=checkbox> Display Approved Labels</div></div><div class=col-md-6><div ng-if=vm.selectedLabelSummary class=\"btn-group pull-right\"><button ng-click=vm.deleteSelectedLabel() class=\"btn btn-default\">Delete</button> <button ng-click=vm.navigateToSelectedLabel() class=\"btn btn-default\">Open</button></div></div></div></div>");
$templateCache.put("templates/welcome.html","Welcome to Label Builder!");}]);