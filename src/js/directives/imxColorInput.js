angular.module('imx.colorPicker').directive('input', ['$compile', '$rootScope', function ($compile, $rootScope) {
    "use strict";

    var VerticalPosition = {
        Top: 0,
        Bottom: 1
    };

    var HorizontalPosition = {
        Left: 0,
        Right: 1
    };

    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scopeOriginal, element, attr, ngModelController) {
            function reposition() {
                var cumulativeOffset = function(element) {
                    var top = 0, left = 0, width = element.offsetWidth, height = element.offsetHeight;
                    do {
                        top += element.offsetTop  || 0;
                        left += element.offsetLeft || 0;
                        element = element.offsetParent;
                    } while(element);

                    return {
                        top: top,
                        left: left,
                        width: width,
                        height: height
                    };
                };


                var offset = cumulativeOffset(element[0]);
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                if (scope.state.left) {
                    colorMenu.css('right','auto');
                    colorMenu.css('left',offset.left + "px");
                } else {
                    colorMenu.css('left','auto');
                    colorMenu.css('right',(w - offset.left - offset.width) + "px");
                }

                if (scope.state.up) {
                    colorMenu.css('bottom','auto');
                    colorMenu.css('top',(offset.top + offset.height) + "px");
                } else {
                    colorMenu.css('top','auto');
                    colorMenu.css('bottom',(h - offset.top) + "px");
                }
            }

            function showWindow () {
                var clientRect = element[0].getBoundingClientRect();
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                var vertical = VerticalPosition.Bottom;
                var horizontal = HorizontalPosition.Left;
                var topGap = clientRect.top;
                var bottomGap = h - clientRect.bottom;
                var leftGap = clientRect.left;
                var rightGap = w - clientRect.right;
                if (topGap > bottomGap) {
                    vertical = VerticalPosition.Top;
                }
                if (rightGap > leftGap) {
                    horizontal = HorizontalPosition.Right;
                }

                scope.state.up = (vertical == VerticalPosition.Bottom);
                scope.state.left = (horizontal == HorizontalPosition.Right);
                reposition();

                scope.state.shown = true;
            }

            if (attr.type !== "imx-color") {
                return;
            }
            var scope = $rootScope.$new(true);

            scope.state = {
                color: attr.value || "#FFFFFF",
                shown: false
            };
            var colorMenu = angular.element('<div class="imx-color-popup-wrapper" ng-show="state.shown">' +
                '<div class="arrow-up left-side-arrow" ng-show="state.up && state.left"></div>' +
                '<div class="arrow-up right-side-arrow" ng-show="state.up && !state.left"></div>' +
                '<div class="arrow-clear"></div>' +
                '<imx-color-picker selected-color="state.color" on-close="state.shown = false;"></imx-color-picker>' +
                '<div class="bottom-arrow-container">' +
                '<div class="arrow-down left-side-arrow" ng-show="!state.up && state.left"></div>' +
                '<div class="arrow-down right-side-arrow" ng-show="!state.up && !state.left"></div>' +
                '</div>' +
                '</div>');
            element.after(colorMenu);
            element.attr('readonly', true);
            element.addClass('imx-color-input');

            $compile(colorMenu)(scope);

            element.on('click', function() {
                showWindow();
            });

            scope.$watch('state.color', function(newValue) {
                if (ngModelController) {
                    ngModelController.$setViewValue(newValue);
                }
            });
        }
    };
}]);