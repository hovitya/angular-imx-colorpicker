/**
 * @ngdoc directive
 * @name imx.colorPicker.directive:imxResize
 * @param {function} imxResize Resize callback. Passed parameters: `width, height`
 * @param {number} imxTimeout Check frequency.
 *
 */
angular.module("imx.colorPicker").directive('imxResize', ['$timeout', function ($timeout) {
    "use strict";
    return {
        restrict: 'A',
        scope: { method: '&imxResize' },
        link: function (scope, $element, attrs) {
            var width = $element[0].offsetWidth;
            var height = $element[0].offsetHeight;
            var timeout = attrs.imxTimeout || 1000;
            function check() {
                requestAnimationFrame(function () {
                    var newWidth = $element[0].offsetWidth;
                    var newHeight = $element[0].offsetHeight;
                    if (newWidth !== width || newHeight !== height) {
                        width = newWidth;
                        height = newHeight;
                        scope.$apply(function() {
                            scope.method({width: newWidth, height: newHeight});
                        });
                    }
                    $timeout(check, timeout);
                }, undefined);
            }

            check();
        }
    };
}]);