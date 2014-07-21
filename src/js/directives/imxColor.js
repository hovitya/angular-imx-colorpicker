angular.module("imx.colorpicker").directive('imxColor', ['imxPaletteService', function factory(paletteService) {
    return {
        restrict: 'A',
        scope: {
            instColor: "@imxColor"
        },
        link: function ($scope, $element, attrs) {
            var innerColor = paletteService.createColor($scope.instColor);

            function update() {
                $element.css('backgroundColor', innerColor.getHex());
            }

            $scope.$watch('instColor', function(newValue, oldValue) {
                innerColor.parse(newValue);
                update();
            });

            update();
        }
    };
}]);