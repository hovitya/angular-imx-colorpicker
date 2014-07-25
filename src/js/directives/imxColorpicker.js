angular.module('imx.colorpicker').directive('imxColorPicker', ['imxPaletteService', function factory(paletteService) {
        "use strict";
        return {
            restrict: 'AE',
            templateUrl: function(elem,attrs) {
                return attrs.templateUrl || 'js/imx-color-picker/colorpicker.html';
            },
            scope: {
                baseColors: "=baseColors",
                format: "&format"
            },
            link: function ($scope, $element, attrs, ngModelController) {
                function populateSolidColors() {
                    $scope.solidColors = paletteService.createSolidColors($scope.baseColors);
                }
                $scope.state = {color : "#000000", components: {red: 0, green: 0, blue: 0}};

                $scope.lastUsed = ["#FF0000","#00FF00",'#0000FF',"#FF0099","#FFFF00",'#100FFF',"#FF000F","#0FFF00",'#FF00FF'];

                $scope.$watchCollection(
                    "baseColors",
                    function( newValue, oldValue ) {
                        populateSolidColors();
                    }
                );

                $scope.setActive = function (clr) {
                   $scope.state.color = paletteService.toHex(clr);
                };



                $scope.$watch('state.color', function(newValue, oldValue) {
                    //update components
                    var color = paletteService.createColor(newValue);
                    var r = color.red();
                    var g = color.green();
                    var b = color.blue();
                    if ($scope.state.components.red !== r) {
                        $scope.state.components.red = r;
                    }
                    if ($scope.state.components.green !== g) {
                        $scope.state.components.green = g;
                    }
                    if ($scope.state.components.blue !== b) {
                        $scope.state.components.blue = b;
                    }
                });


                populateSolidColors();
            }
        };
    }]
);