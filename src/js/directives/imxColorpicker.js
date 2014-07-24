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
                //$scope.color = $scope.selectedColor;

                $scope.lastUsed = ["#FF0000","#00FF00",'#0000FF',"#FF0099","#FFFF00",'#100FFF',"#FF000F","#0FFF00",'#FF00FF'];

                $scope.$watchCollection(
                    "baseColors",
                    function( newValue, oldValue ) {
                        populateSolidColors();
                    }
                );

                $scope.setActive = function (clr) {
                   $scope.color = paletteService.toHex(clr);
                };



                /*$scope.$watch('color', function(newValue, oldValue) {
                    if ($scope.selectedColor !== undefined) {
                        $scope.selectedColor = newValue;
                    }
                });*/


                populateSolidColors();
            }
        };
    }]
);