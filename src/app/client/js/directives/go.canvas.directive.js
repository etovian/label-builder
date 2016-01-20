(function () {

    'use strict';

    function GoCanvasDirective() {

        function link(scope, element) {

            var div = element.find('#diagram')[0];
            // var diagram = new go.Diagram(div);
            var $m = go.GraphObject.make;
            var diagram = $m(go.Diagram, div, {
                initialContentAlignment: go.Spot.TopCenter,
                'grid.visible': true,
                'grid.gridCellSize': new go.Size(20, 20)
            });

            angular.extend(scope.vm, {
                diagram: diagram
            });
        }

        function GoCanvasDirectiveController($interval) {

            var $m = go.GraphObject.make;
            var vm = this;
            angular.extend(vm, {
                isUpdate: true,
                renderedLabel: null,
                render: function() {

                    try {

                        if(vm.isUpdate && vm.diagram) {

                            vm.renderedLabel = new go.Node(go.Panel.Auto);
                            vm.renderedLabel.angle = 0;

                            var scaffold = new go.Panel(go.Panel.Table);
                            var image = new go.Picture();
                            var warningPanel = new go.Panel(go.Panel.Auto);
                            var warningBorder = new go.Shape();
                            var warning = new go.TextBlock();
                            var directionsPanel = new go.Panel(go.Panel.Auto);
                            var directions = new go.TextBlock();

                            angular.extend(image, {
                                width: 250,
                                height: 250,
                                source: 'src/app/client/images/4022083-250cc.png',
                                row: 0,
                                column: 0
                            });

                            angular.extend(warningPanel, {
                                row: 1,
                                column: 0,
                                margin: new go.Margin(5)
                            });

                            angular.extend(warningBorder, {
                                strokeWidth: 5,
                                fill: 'white'
                            });

                            angular.extend(warning, {
                                text: 'Warning: DO NOT do the things.',
                                textAlign: 'left',
                                background: 'white',
                                width: 235,
                                margin: 5
                            });

                            angular.extend(directionsPanel, {
                                row: 2,
                                column: 0
                            });

                            angular.extend(directions, {
                                text: 'Directions: DO the things.',
                                textAlign: 'left',
                                background: 'white',
                                width: 235,
                                margin: 5
                            });

                            scaffold.add(image);
                            warningPanel.add(warningBorder);
                            warningPanel.add(warning);
                            scaffold.add(warningPanel);
                            directionsPanel.add(directions);
                            scaffold.add(directionsPanel);
                            vm.renderedLabel.add(scaffold);
                            vm.diagram.add(vm.renderedLabel);



                            var node2 =
                                $m(go.Node, "Auto",
                                  $m(go.Shape,
                                    { figure: "RoundedRectangle",
                                      fill: "pink" }),
                                  $m(go.TextBlock,
                                    { text: "Note: Maybe a more specific warning and directions?",
                                      margin: 5 })
                                );

                            var nodeLink = $m(go.Link, {
                                fromNode: node2, toNode: vm.renderedLabel },
                                $m(go.Shape),
                                $m(go.Shape, { toArrow: 'OpenTriangle', fill: null})
                            );

                            vm.diagram.add(node2);
                            vm.diagram.add(nodeLink);


                            vm.isUpdate = false;
                        }
                    } catch(ex) {
                        console.error(ex);
                    } finally {
                        vm.isUpdate = false;
                    }
                },
                _render: function() {

                    try {

                        if(vm.isUpdate && vm.diagram) {

                            vm.node = new go.Node(go.Panel.Auto);
                            vm.node.angle = 0;

                            var panel1 = new go.Panel(go.Panel.Auto);
                            var table = new go.Panel(go.Panel.Table);
                            var rectangle = new go.Shape();
                            var rectangle2 = new go.Shape();
                            var textBlock = new go.TextBlock();

                            angular.extend(rectangle, {
                                figure: 'Rectangle',
                                fill: '#9eacab',
                                width: 100,
                                strokeWidth: 5,
                                row: 0,
                                column: 0
                            });

                            angular.extend(rectangle2, {
                                figure: 'Rectangle',
                                fill: 'red',
                                row: 1,
                                column: 0,
                                margin: 5
                            });

                            angular.extend(textBlock, {
                                text: 'Howdy!',
                                margin: 5
                            });

                            table.add(panel1);
                            panel1.add(rectangle);
                            table.add(rectangle2);
                            panel1.add(textBlock);
                            vm.node.add(table);
                            vm.diagram.add(vm.node);

                            vm.isUpdate = false;
                        }
                    } catch(ex) {
                        console.error(ex);
                    } finally {
                        vm.isUpdate = false;
                    }
                }
            });

            $interval(function () {
                vm.render();
            }, 25);

        }

        var controller = [
            '$interval',
            GoCanvasDirectiveController
        ];

        return {
            scope: {
                nutraLabel: '='
            },
            templateUrl: 'directives/go.canvas.html',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            link: link,
            replace: true
        };
    }

    angular.module('app').directive('goCanvas', [GoCanvasDirective]);
}());