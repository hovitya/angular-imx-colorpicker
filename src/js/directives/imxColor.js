angular.module("imx.colorpicker").directive('imxColor', function factory() {
    return {
        restrict: 'A',
        scope: {
            instColor: "@imxColor"
        },
        link: function ($scope, $element, attrs) {
            var innerColor = new Color($scope.instColor);

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
});