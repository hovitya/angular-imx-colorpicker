angular.module("imx.colorpicker").directive('imxResize', function ($parse) {
    "use strict";
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;
    for (var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
        requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!requestAnimationFrame) {
        requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!cancelAnimationFrame) {
        cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
    var directiveDefinitionObject = {
        restrict: 'A',
        scope: { method: '&imxResize' },
        link: function ($scope, $element, attrs) {
            var width = $element[0].offsetWidth;
            var height = $element[0].offsetHeight;
            requestAnimationFrame(function() {
                var newWidth = $element[0].offsetWidth;
                var newHeight = $element[0].offsetHeight;
                if (newWidth !== width || newHeight !== height) {
                    width = newWidth;
                    height = newHeight;
                    $scope.method({width: newWidth, height: newHeight});
                }
            });
        }
    };
    return directiveDefinitionObject;
});