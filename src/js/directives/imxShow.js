angular.module('imx.colorPicker').directive('imxShow', [ function factory() {
        "use strict";
        return {
            restrict: 'A',
            link: function (scope, $element, attrs, ngModelController) {
                scope.$watch(attrs.imxShow, function(newValue) {
                    if (newValue) {
                        $element.removeClass('imx-hide');
                        $element.addClass('imx-show');
                    } else {
                        $element.removeClass('imx-show');
                        $element.addClass('imx-hide');
                    }
                });
            }
        };
    }]
);