/**
 * @ngdoc directive
 * @name imx.colorPicker.directive:imxColorDisplay
 * @restrict A
 * @param {@string} imxColorDisplay Color string. Formats: `#FFFFFF, rgb(12,31,21), hsl(260,50%,100%)`
 */
angular.module("imx.colorPicker").directive('imxColorDisplay', ['imxPaletteService', function factory(paletteService) {
    "use strict";
    return {
        restrict: 'A',
        scope: {
            instColor: "@imxColorDisplay"
        },
        link: function (scope, $element, attrs) {
            var innerColor = paletteService.createColor(scope.instColor);

            function update() {
                $element.css('backgroundColor', innerColor.getHex());
            }

            scope.$watch('instColor', function(newValue, oldValue) {
                innerColor.parse(newValue);
                update();
            });

            update();
        }
    };
}]);