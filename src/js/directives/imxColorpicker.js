angular.module('imx.colorpicker').directive('imxColorPicker', function factory() {
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
                    var newColors = [];
                    var baseColors = ['#333ECF', '#6A3FC4', '#C53E3E', '#E89C30', '#E3E31F', '#40C353'];
                    var lightnessValues = [73, 65, 51, 43, 34, 24];
                    var colorDisposable = new Color();
                    if ($scope.baseColors) {
                        baseColors = $scope.baseColors;
                    }
                    var greyStep = 50 / baseColors.length;
                    var currentGrey1 = 100;
                    var currentGrey2 = 50;
                    for(var i in baseColors) {
                        if (baseColors.hasOwnProperty(i)) {
                            colorDisposable.parse("#000000");
                            colorDisposable.lightness(currentGrey1);
                            newColors.push(colorDisposable.getHex());
                            colorDisposable.lightness(currentGrey2);
                            newColors.push(colorDisposable.getHex());
                            colorDisposable.parse(baseColors[i]);
                            for(var j = 0; j < lightnessValues.length; j++) {
                                colorDisposable.lightness(lightnessValues[j]);
                                newColors.push(colorDisposable.getHex());
                            }
                            currentGrey1 -= greyStep;
                            currentGrey2 -= greyStep;
                        }
                    }
                    $scope.solidColors = newColors;
                }


                var innerColor = new Color($scope.selectedColor);
                $scope.lastUsed = ["#FF0000","#00FF00",'#0000FF',"#FF0099","#FFFF00",'#100FFF',"#FF000F","#0FFF00",'#FF00FF'];


                $scope.$watch('selectedColor', function (newValue, oldValue) {
                    innerColor.parse(newValue);
                });

                populateSolidColors();
            }
        };
    }
);