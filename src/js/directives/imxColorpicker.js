angular.module('imx.colorpicker').directive('imxColorPicker', ['imxPaletteService', function factory(paletteService) {
        "use strict";
        return {
            restrict: 'AE',
            templateUrl: function(elem,attrs) {
                return attrs.templateUrl || 'js/imx-color-picker/colorpicker.html';
            },
            scope: {
                selectedColor: "=color",
                baseColors: "=baseColors",
                format: "&format"
            },
            link: function ($scope, $element, attrs) {
                function populateSolidColors() {
                    $scope.solidColors = paletteService.createSolidColors($scope.baseColors);
                }


                var innerColor = new Color($scope.selectedColor);
                $scope.lastUsed = ["#FF0000","#00FF00",'#0000FF',"#FF0099","#FFFF00",'#100FFF',"#FF000F","#0FFF00",'#FF00FF'];

                $scope.$watchCollection(
                    "baseColors",
                    function( newValue, oldValue ) {
                        populateSolidColors();
                    }
                );

                $scope.$watch('selectedColor', function (newValue, oldValue) {
                    innerColor.parse(newValue);
                });

                populateSolidColors();
            }
        };
    }]
);