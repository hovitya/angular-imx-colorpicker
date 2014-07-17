angular.module("imx.colorpicker").directive('imxColor', function factory(injectables) {
    return {
        restrict: 'A',
        scope: {
            instColor: "="
        },
        link: function ($scope, $element, attrs) {
            var innerColor = new Color($scope.instColor);

            function update() {
                $element.css('backgroundColor', innerColor.toHex());
            }

            $scope.watch('instColor', function(newValue, oldValue) {
                innerColor.parse(newValue);
                update();
            });

            update();
        }
    };
});