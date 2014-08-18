/**
 * @ngdoc directive
 * @name imx.colorPicker.directive:imxPopOver
 * @restrict EA
 * @param {string} for Selector for host component. e.g. #buttonId
 * @param {string} trigger Trigger type. The default trigger type is `click`. Click means popup opened when user clicks on host element and it will be dismissed when clicks again. If value set to `hover` mouse over event will trigger this popover and mouse out will dismiss it. If you want to control popover manually set trigger to `none`.
 */
angular.module("imx.colorPicker").directive('imxPopOver', ['$timeout', function ($timeout) {
    "use strict";

    var TriggerTypes = {
        Hover: 'hover',
        Click: 'click',
        Never: 'never'
    };


    var VerticalPosition = {
        Top: 0,
        Bottom: 1
    };

    var HorizontalPosition = {
        Left: 0,
        Right: 1
    };


    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {for: '@', trigger: '@', forElement: "=", show: '@'},
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || 'template/partials/popover.html';
        },
        controller: function ($scope, $element) {
            var targetElement;
            $scope.state = {
                shown: false,
                left: false,
                up: false
            };

            $scope.$watch('for', function(newValue) {
                if (!newValue) {
                    return;
                }
                if (targetElement) {
                    removeListeners(targetElement);
                }
                targetElement = angular.element(document.querySelector(newValue));
                attachListeners(targetElement);
            });

            $scope.$watch('forElement', function(newValue) {
                if (!newValue) {
                    return;
                }
                if (targetElement) {
                    removeListeners(targetElement);
                }
                targetElement = newValue;

                attachListeners(targetElement);
            });

            $scope.$watch('show', function(newValue) {
                if (newValue) {
                    showWindow(targetElement, $element);
                } else {
                    hideWindow();
                }
            });

            function onClick(event) {
                if($scope.trigger !== TriggerTypes.Click && $scope.trigger !== undefined) {
                    return;
                }
                if(!$scope.state.shown) {
                    showWindow(targetElement, $element);
                    $scope.$digest();
                } else {
                    hideWindow();
                    $scope.$digest();
                }

            }

            function onMouseOver(event) {
                if($scope.trigger !== TriggerTypes.Hover) {
                    return;
                }
                showWindow(targetElement, $element);
                $scope.$digest();
            }

            function onMouseOut(event) {
                if($scope.trigger !== TriggerTypes.Hover) {
                    return;
                }
                hideWindow();
                $scope.$digest();
            }

            function attachListeners(element) {
                element.on('click', onClick);
                element.on('mouseover', onMouseOver);
                element.on('mouseout', onMouseOut);
            }

            function removeListeners(element) {
                element.off('click', onClick);
                element.off('mouseover', onMouseOver);
                element.off('mouseout', onMouseOut);
            }

            function hideWindow() {
                $scope.state.shown = false;
            }

            function showWindow (element, popOver) {
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

                $scope.state.up = (vertical == VerticalPosition.Bottom);
                $scope.state.left = (horizontal == HorizontalPosition.Right);
                reposition();

                $scope.state.shown = true;

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

                    if ($scope.state.left) {
                        popOver.css('right','auto');
                        popOver.css('left',offset.left + "px");
                    } else {
                        popOver.css('left','auto');
                        popOver.css('right',(w - offset.left - offset.width) + "px");
                    }

                    if ($scope.state.up) {
                        popOver.css('bottom','auto');
                        popOver.css('top',(offset.top + offset.height) + "px");
                    } else {
                        popOver.css('top','auto');
                        popOver.css('bottom',(h - offset.top) + "px");
                    }
                }
            }
        }
    };
}]);