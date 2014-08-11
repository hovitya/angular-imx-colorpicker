angular.module('imx.colorPicker').directive('input', ['$compile', '$rootScope', function ($compile, $rootScope) {
    "use strict";

    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scopeOriginal, element, attr, ngModelController) {
            if (attr.type !== "imx-color") {
                return;
            }

            var scope = $rootScope.$new(false);

            scope.element = element;

            scope.state = {
                color: attr.value || "#FFFFFF"
            };

            var colorMenu = angular.element('<imx-pop-over for-element="element">' +
                '<imx-color-picker selected-color="state.color" on-close="state.shown = false;" closable="true"></imx-color-picker>' +
                '</imx-pop-over>');
            element.after(colorMenu);
            element.attr('readonly', true);
            element.addClass('imx-color-input');
            $compile(colorMenu)(scope);

            scope.$on('imx-popover-open', function (event, args) {
                if (args.target !== colorMenu) {
                    scope.state.shown = false;
                }
            });

            scope.$watch('state.color', function(newValue) {
                if (ngModelController) {
                    ngModelController.$setViewValue(newValue);
                }
            });
        }
    };
}]);