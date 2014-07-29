angular.module('imx.colorPicker').directive('input', ['$compile', function ($compile) {
    "use strict";
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, element, attr, ngModelController) {
            if (attr.type !== "imx-color") {
                return;
            }
            scope.state = {
                color: attr.value || "#FFFFFF",
                shown: false
            };
            var colorMenu = angular.element('<div class="imx-color-popup-wrapper" ng-show="state.shown">' +
                '<div class="arrow-up left-side-arrow"></div>' +
                '<div class="arrow-up right-side-arrow"></div>' +
                '<div class="arrow-clear"></div>' +
                '<imx-color-picker selected-color="state.color" on-close="state.shown = false;"></imx-color-picker>' +
                '</div>');
            element.after(colorMenu);
            $compile(colorMenu)(scope);

            element.on('focus', function() {
                scope.state.shown = true;
            });

            scope.watch('state.color', function(newValue) {
                if (ngModelController) {
                    ngModelController.$setViewValue(newValue);
                }
            });
        }
    };
}]);