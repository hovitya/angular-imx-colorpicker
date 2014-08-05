angular.module('imxColorPickerTemplates', ['template/partials/colorPicker.html']);

angular.module("template/partials/colorPicker.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/partials/colorPicker.html",
    "<div class=\"imx-colorpicker-wrapper\">\n" +
    "    <!-- Fix header -->\n" +
    "        <div class=\"imx-colorpicker-block imx-colorpicker-header\" imx-resize=\"resize(width, height)\">\n" +
    "            <div class=\"imx-selected-color\" imx-color-display=\"{{state.color}}\" ></div>\n" +
    "            <button class=\"imx-fav-button\" ng-class=\"{active: favouriteSelected}\" ng-click=\"toggleFavourite(state.color)\">&hearts;</button>\n" +
    "            <button class=\"imx-colorpicker-close\" ng-show=\"onDemandMode\" ng-click=\"close()\">&#10005; close</button>\n" +
    "        </div>\n" +
    "\n" +
    "    <!-- Carousel for color picker pages -->\n" +
    "    <ul data-rn-carousel data-rn-carousel-indicator>\n" +
    "        <!-- Solid colors tab -->\n" +
    "        <li>\n" +
    "            <div class=\"imx-colorpicker-block\">\n" +
    "                <div class=\"imx-colorPicker-label\">Last used</div>\n" +
    "                <div class=\"color-list imx-last-used\">\n" +
    "                    <div class=\"color-item\" data-ng-repeat=\"color in history| limitTo : 8\" imx-color-display=\"{{color}}\" ng-click=\"setActive(color)\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"imx-colorpicker-block\">\n" +
    "                <div class=\"imx-colorPicker-label\">Solid colors</div>\n" +
    "                <div class=\"color-list\">\n" +
    "                    <div class=\"color-item\" data-ng-repeat=\"color in solidColors| limitTo : 56\" imx-color-display=\"{{color}}\" ng-click=\"setActive(color)\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "        <!-- Advanced tab -->\n" +
    "        <li>\n" +
    "            <div class=\"imx-colorpicker-block\">\n" +
    "                <imx-color-shades ng-model=\"state.color\"></imx-color-shades>\n" +
    "            </div>\n" +
    "            <div class=\"imx-colorpicker-block fix-overflow\">\n" +
    "                <input type=\"text\"\n" +
    "                       ng-model=\"state.color\"\n" +
    "                       spellcheck=\"false\"\n" +
    "                       class=\"imx-hex\"\n" +
    "                       maxlength=\"7\"\n" +
    "                       ng-model-options=\"{ updateOn: 'default blur', debounce: {'default': 10000, 'blur': 0} }\">\n" +
    "                <input type=\"text\"\n" +
    "                       ng-model=\"state.components.blue\"\n" +
    "                       spellcheck=\"false\"\n" +
    "                       maxlength=\"3\"\n" +
    "                       class=\"imx-rgb imx-b\"\n" +
    "                       ng-mouseenter=\"bHover = true;\"\n" +
    "                       ng-mouseleave=\"bHover = false;\"\n" +
    "                       ng-focus=\"bActive = true;\"\n" +
    "                       ng-blur=\"bActive = false;\"\n" +
    "                       ng-model-options=\"{ updateOn: 'default blur', debounce: {'default': 1000, 'blur': 0} }\">\n" +
    "                <div class=\"imx-rgb-label\" ng-class=\"{active: bHover || bActive}\">B</div>\n" +
    "                <input type=\"text\"\n" +
    "                       ng-model=\"state.components.green\"\n" +
    "                       maxlength=\"3\"\n" +
    "                       spellcheck=\"false\"\n" +
    "                       class=\"imx-rgb imx-g\"\n" +
    "                       ng-mouseenter=\"gHover = true;\"\n" +
    "                       ng-mouseleave=\"gHover = false;\"\n" +
    "                       ng-focus=\"gActive = true;\"\n" +
    "                       ng-blur=\"gActive = false;\"\n" +
    "                       ng-model-options=\"{ updateOn: 'default blur', debounce: {'default': 1000, 'blur': 0} }\">\n" +
    "                <div class=\"imx-rgb-label\" ng-class=\"{active: gHover || gActive}\">G</div>\n" +
    "                <input type=\"text\"\n" +
    "                       ng-model=\"state.components.red\"\n" +
    "                       maxlength=\"3\"\n" +
    "                       spellcheck=\"false\"\n" +
    "                       class=\"imx-rgb imx-r\"\n" +
    "                       ng-mouseenter=\"rHover = true;\"\n" +
    "                       ng-mouseleave=\"rHover = false;\"\n" +
    "                       ng-focus=\"rActive = true;\"\n" +
    "                       ng-blur=\"rActive = false;\"\n" +
    "                       ng-model-options=\"{ updateOn: 'default blur', debounce: {'default': 1000, 'blur': 0} }\">\n" +
    "                <div class=\"imx-rgb-label\" ng-class=\"{active: rHover || rActive}\">R</div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </li>\n" +
    "        <!-- Favourites tab -->\n" +
    "        <li>\n" +
    "            <div class=\"imx-colorpicker-block\">\n" +
    "                <div class=\"imx-colorPicker-label\">Favourites</div>\n" +
    "                <div class=\"color-list\">\n" +
    "                    <div class=\"color-item\" data-ng-repeat=\"color in favourites\" imx-color-display=\"{{color}}\" ng-click=\"setActive(color)\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);
;/**
 * @ngdoc overview
 * @name imx.colorPicker
 */
angular.module("imx.colorPicker", ['angular-carousel', 'imxColorPickerTemplates', 'ngAnimate']);;/**
 * @ngdoc directive
 * @name imx.colorPicker.directive:imxColorDisplay
 * @restrict A
 * @param {@string} imxColorDisplay Color string. Formats: `#FFFFFF, rgb(12,31,21), hsl(260,50%,100%)`
 */
angular.module("imx.colorPicker").directive('imxColorDisplay', ['imxPaletteService', function factory(paletteService) {
    "use strict";
    return {
        restrict: 'A',
        scope: {
            instColor: "@imxColorDisplay"
        },
        link: function (scope, $element, attrs) {
            var innerColor = paletteService.createColor(scope.instColor);

            function update() {
                $element.css('backgroundColor', innerColor.getHex());
            }

            scope.$watch('instColor', function(newValue, oldValue) {
                innerColor.parse(newValue);
                update();
            });

            update();
        }
    };
}]);;angular.module('imx.colorPicker').directive('input', ['$compile', '$rootScope', function ($compile, $rootScope) {
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
}]);;/**
 * @ngdoc directive
 * @requires imx.colorPicker.service:imxPaletteService
 * @requires imx.colorPicker.directive:imxResize
 * @name imx.colorPicker.directive:imxColorShades
 * @scope
 * @restrict EA
 * @param {string} ngModel Assignable angular expression to data-bind to. Data will be bind in hex format.
 * @description
 * Render hue, brightness and saturation input control.
 *
 */
angular.module('imx.colorPicker').directive('imxColorShades', ['imxPaletteService', '$window', function (paletteService, $window) {
    "use strict";

    var Parameters = {
        BSCanvasSize: 100,
        MaxHue: 360,
        Opaque: 255,
        DarkLightnessValues: [51, 43, 34, 24]
    };


    return {
        restrict: 'AE',
        replace: true,
        require: 'ngModel',
        template: "<div class='imx-color-shades-wrapper'>" +
        "<canvas width='{{canvasWidth}}' height='10' class='imx-color-shades-versions'></canvas>" +
        "<canvas width='{{canvasWidth}}' height='{{canvasHeight}}' class='imx-color-shades'></canvas>" +
        "<canvas width='{{canvasWidth}}' height='20' class='imx-color-shades-hue'></canvas>" +
        "<canvas width='{{canvasWidth}}' height='{{canvasHeight + 30}}' class='imx-color-shades-chrome' ng-click='chromeClicked($event)'></canvas>" +
        "</div>",
        scope: {},
        link: function (scope, $element, attrs, ngModelController) {
            var hueRendered = false;
            var lastRenderedHue;
            var tempCanvas = angular.element('<canvas>')
                .attr('width', Parameters.BSCanvasSize)
                .attr('height', Parameters.BSCanvasSize)[0];

            ngModelController.$parsers.push(function (viewvalue) {
                var color = paletteService.createColor();
                color.hue(viewvalue.hue);
                color.saturation(viewvalue.saturation);
                color.brightness(viewvalue.brightness);
                return color.getHex();
            });

            ngModelController.$formatters.push(function (modelvalue) {
                var color = paletteService.createColor(modelvalue);
                return {
                    hue: color.hue(),
                    saturation: color.saturation(),
                    brightness: color.brightness()
                };
            });

            ngModelController.$render = function () {
                requestAnimationFrame(function () {
                    renderChrome(ngModelController.$viewValue.hue,
                        ngModelController.$viewValue.saturation,
                        ngModelController.$viewValue.brightness);
                    renderImage(ngModelController.$viewValue.hue,
                        ngModelController.$viewValue.saturation,
                        ngModelController.$viewValue.brightness);

                }, undefined);
            };

            function updateModel(h, s, b) {
                ngModelController.$setViewValue({hue: h, saturation: s, brightness: b});
                ngModelController.$render();
            }

            function renderImage(hue) {
                if (!hueRendered) {
                    renderHue();
                }
                if (lastRenderedHue === hue) {
                    return;
                }
                lastRenderedHue = hue;

                //Render saturation and brightness
                var color = paletteService.createColor("hsl(" + hue + ",100%,50%)");
                var hex = color.getHex();
                var canvas = $element.children()[1];
                var width = canvas.width,
                    height = canvas.height;
                /**
                 *
                 * @type {CanvasRenderingContext2D}
                 */
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, width, height);
                var data = ctx.createImageData(Parameters.BSCanvasSize, Parameters.BSCanvasSize);
                var imageData = data.data;
                var widthScale = width / Parameters.BSCanvasSize;
                var heightScale = height / Parameters.BSCanvasSize;
                for (var y = 0; y < Parameters.BSCanvasSize; y++) {
                    for (var x = 0; x < Parameters.BSCanvasSize; x++) {
                        var startPoint = ((Parameters.BSCanvasSize * y) + x) * 4;
                        color.saturation(y);
                        color.brightness(x);
                        imageData[startPoint] = color.red();
                        imageData[startPoint + 1] = color.green();
                        imageData[startPoint + 2] = color.blue();
                        imageData[startPoint + 3] = Parameters.Opaque;
                    }
                }

                tempCanvas.getContext('2d').putImageData(data, 0, 0);
                ctx.save();
                ctx.scale(widthScale, heightScale);
                ctx.drawImage(tempCanvas, 0, 0);
                ctx.restore();


                //Render versions
                var versionCanvas = $element.children()[0];
                var versionCtx = versionCanvas.getContext("2d");
                var versionColors = paletteService.createSolidColors([hex], Parameters.DarkLightnessValues, false);
                var versionWidth = Math.ceil(width / versionColors.length);
                for (var k = 0; k < versionColors.length; k++) {
                    versionCtx.fillStyle = versionColors[k];
                    versionCtx.fillRect(k * versionWidth, 0, versionWidth, 10);
                }
            }

            function renderHue() {
                //Render hue
                var hueCanvas = $element.children()[2];
                var width = hueCanvas.width;
                var step = Parameters.MaxHue / width;
                var ctx = hueCanvas.getContext('2d');
                for (var i = 0; i < width; i++) {
                    ctx.strokeStyle = "hsl(" + (i * step) + ",100%,50%)";
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, hueCanvas.height);
                    ctx.stroke();
                }
            }

            function renderChrome(hue, sat, bri) {
                //Mark hue
                var canvas = $element.children()[3];
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "white";

                var hueStart = canvas.width - 20;
                var huePercentage = hue / Parameters.MaxHue * 100;
                var centerX = Math.round(canvas.width * (huePercentage / 100.0));
                var centerY = hueStart + 4;
                var radius = 4;

                ctx.beginPath();
                ctx.fillOpacity = 1;
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                ctx.fill();

                //Mark brightness and saturation
                var lightnessPosition = ((bri) / 100) * canvas.width;
                var saturationPosition = (((sat) / 100) * (canvas.height - 30)) + 10;

                ctx.beginPath();
                ctx.strokeOpacity = 1;
                if (sat < 50 && bri > 50) {
                    ctx.strokeStyle = "black";
                } else {
                    ctx.strokeStyle = "white";
                }
                ctx.lineWidth = 2;
                ctx.arc(lightnessPosition, saturationPosition, radius, 0, 2 * Math.PI, false);
                ctx.stroke();

            }

            angular.element($window).on("orientationchange", function () {
                scope.canvasWidth = $element.children()[1].offsetWidth;
                scope.canvasHeight = $element.children()[1].offsetHeight;
                ngModelController.$render();
            });

            scope.canvasWidth = $element.children()[1].offsetWidth;
            scope.canvasHeight = $element.children()[1].offsetHeight;

            function fixEvent(e) {
                if (! e.hasOwnProperty('offsetX')) {
                    var curleft = 0,
                        curtop = 0;
                    if (e.offsetParent) {
                        var obj=e;
                        do {
                            obj = obj.offsetParent;
                            curleft += obj.offsetLeft;
                            curtop += obj.offsetTop;
                        } while (obj.offsetParent);
                    }
                    e.offsetX=e.layerX-curleft;
                    e.offsetY=e.layerY-curtop;
                }
                return e;
            }

            scope.chromeClicked = function ($event) {
                $event = fixEvent($event);
                var canvas = $element.children()[3];
                var p;
                if ($event.offsetY <= 10) {
                    //Variations clicked
                    p = $element.children()[0].getContext('2d').getImageData($event.offsetX, $event.offsetY, 1, 1).data;
                    var color = paletteService.createColor({red: p[0], green: p[1], blue: p[2]});
                    updateModel(color.hue(), color.saturation(), color.brightness());
                } else if ($event.offsetY > canvas.height - 20) {
                    //Hue clicked
                    p = $element.children()[2].getContext('2d').getImageData($event.offsetX, $event.offsetY - canvas.height + 20, 1, 1).data;
                    var selectedHue = paletteService.createColor({red: p[0], green: p[1], blue: p[2]});
                    updateModel(selectedHue.hue(), ngModelController.$viewValue.saturation, ngModelController.$viewValue.brightness);
                } else {
                    //BS clicked
                    var coord = {
                        x: Math.round($event.offsetX / scope.canvasWidth * 100),
                        y: Math.round(($event.offsetY - 10) / scope.canvasHeight * 100)
                    };
                    updateModel(ngModelController.$viewValue.hue, coord.y, coord.x);
                }
            };

            ngModelController.$render();
        }
    };
}]);;/**
 * @ngdoc directive
 * @name imx.colorPicker.directive:imxColorPicker
 * @restrict AE
 * @requires imx.colorPicker.service:imxPaletteService
 * @requires imx.colorPicker.service:imxColorStoreService
 * @scope
 * @param {string} templateUrl Color picker html template url.
 * @param {string} format Output color format `(hex|hsl|rgb)`
 * @param {boolean} closable Display close button on color picker ui and call provided on-close function when it clicked. Current selected color will be added to last used list on close.
 * @param {=Array} baseColors Solid colors will be populated using these base colors. (array of color string)
 * @param {string} ngModel Assignable angular expression to data-bind to. Data will be bind in the specified format.
 * @param {function} onClose Close callback.
 * @description
 * Render color picker component.
 *
 * ### Example
 * ```html
 * <imx-color-picker format="hex" ng-model="myColor"></imx-color-picker>
 * ```
 */
angular.module('imx.colorPicker').directive('imxColorPicker', ['imxPaletteService', 'imxColorStoreService', '$timeout', '$window', function factory(paletteService, imxColorStoreService, $timeout, $window) {
        "use strict";

        var PaletteIds = {
            Favourites: 'favs',
            History: 'hist'
        };

        return {
            restrict: 'AE',
            replace: true,
            templateUrl: function(elem,attrs) {
                return attrs.templateUrl || 'template/partials/colorPicker.html';
            },
            scope: {
                baseColors: "=baseColors",
                format: "&format",
                closable: "&closable",
                selectedColor: "=",
                onClose: '&'
            },
            link: function(scope, $elem, attrs) {
                function setSelectedColor(viewValue) {
                    var color = paletteService.createColor(viewValue);
                    var parsed;
                    switch (scope.format) {
                        case 'rgb':
                            parsed = color.getRGB();
                            break;
                        case 'hsl':
                            parsed = color.getHSL();
                            break;
                        default:
                            parsed = color.getHex();
                            break;
                    }
                    scope.selectedColor = parsed;
                }

                scope.$watch('selectedColor', function(modelValue) {
                    var color = paletteService.createColor(modelValue);
                    scope.state.color = color.getHex();
                });


                scope.state = {color : "#000000", components: {red: 0, green: 0, blue: 0}};
                scope.rHover = false;
                scope.rActive = false;
                scope.bHover = false;
                scope.bActive = false;
                scope.gHover = false;
                scope.gActive = false;
                scope.onDemandMode = false;
                var lastTimeout;


                function populateSolidColors() {
                    scope.solidColors = paletteService.createSolidColors(scope.baseColors);
                }


                scope.$watchCollection(
                    "baseColors",
                    function() {
                        populateSolidColors();
                    }
                );

                scope.setActive = function (clr) {
                   scope.state.color = paletteService.toHex(clr);
                };


                scope.$watch('state.color', function (newValue) {
                    //update components
                    var color = paletteService.createColor(newValue);
                    var r = color.red();
                    var g = color.green();
                    var b = color.blue();
                    if (scope.state.components.red !== r) {
                        scope.state.components.red = r;
                    }
                    if (scope.state.components.green !== g) {
                        scope.state.components.green = g;
                    }
                    if (scope.state.components.blue !== b) {
                        scope.state.components.blue = b;
                    }
                    scope.favouriteSelected = scope.isFavourite(newValue);

                    if (lastTimeout) {
                        $timeout.cancel(lastTimeout);
                    }

                    if (!scope.onDemandMode) {
                        lastTimeout = $timeout(function () {
                            imxColorStoreService.storeColor(newValue, PaletteIds.History, true, 8);
                        }, 50000);
                    }

                    setSelectedColor(newValue);
                });

                scope.$watch('[state.components.green,state.components.red,state.components.blue]', function() {
                    scope.state.color = paletteService.toHex(scope.state.components);
                }, true);


                scope.isFavourite = function (color) {
                    return imxColorStoreService.hasColor(color, PaletteIds.Favourites);
                };

                scope.toggleFavourite = function (color) {
                    if (imxColorStoreService.hasColor(color, PaletteIds.Favourites)) {
                        imxColorStoreService.removeColor(color, PaletteIds.Favourites);
                    } else {
                        imxColorStoreService.storeColor(color, PaletteIds.Favourites);
                    }
                    scope.favouriteSelected = scope.isFavourite(color);
                };

                populateSolidColors();

                scope.favourites = imxColorStoreService.getPalette(PaletteIds.Favourites);
                scope.history = imxColorStoreService.getPalette(PaletteIds.History);

                imxColorStoreService.onPaletteChanged(function (paletteId) {
                    if (paletteId === PaletteIds.Favourites || paletteId === '') {
                        scope.favourites = imxColorStoreService.getPalette(PaletteIds.Favourites);
                    }
                    if (paletteId === PaletteIds.History || paletteId === '') {
                        scope.history = imxColorStoreService.getPalette(PaletteIds.History);
                    }
                });

                scope.$watch('closable', function (newValue) {
                    scope.onDemandMode = newValue;
                });

                // Workaround for rn-carousel and imxColorShades resize problem
                scope.resize = function () {
                    //angular.element($window).triggerHandler('orientationchange');
                };

                scope.close = function () {
                    imxColorStoreService.storeColor(scope.selectedColor, PaletteIds.History, true, 8);
                    scope.onClose({});
                };
            }
        };
    }]
);;/**
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
                        scope.method({width: newWidth, height: newHeight});
                    }
                    $timeout(check, timeout);
                }, undefined);
            }

            check();
        }
    };
}]);;angular.module('imx.colorPicker').directive('imxShow', [ function factory() {
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
);;/**
 * @ngdoc interface
 * @name imx.colorPicker.provider:imxColorProvider
 */
angular.module('imx.colorPicker').factory('imxColorProvider',function() {
    "use strict";
    var Color = (function(){

        var Events = {
            RGB_UPDATED : 'RGBUpdated',
            HSL_UPDATED : 'HSLUpdated',
            HSV_UPDATED : 'HSVUpdated',
            HEX_UPDATED : 'HexUpdated',
            INT_UPDATED : 'IntUpdated',
            UPDATED : 'updated'
        };

        var namedColors = {
            'transparent':'rgba(0, 0, 0, 0)','aliceblue':'#F0F8FF','antiquewhite':'#FAEBD7','aqua':'#00FFFF','aquamarine':'#7FFFD4',
            'azure':'#F0FFFF','beige':'#F5F5DC','bisque':'#FFE4C4','black':'#000000','blanchedalmond':'#FFEBCD','blue':'#0000FF','blueviolet':'#8A2BE2',
            'brown':'#A52A2A','burlywood':'#DEB887','cadetblue':'#5F9EA0','chartreuse':'#7FFF00','chocolate':'#D2691E','coral':'#FF7F50',
            'cornflowerblue':'#6495ED','cornsilk':'#FFF8DC','crimson':'#DC143C','cyan':'#00FFFF','darkblue':'#00008B','darkcyan':'#008B8B','darkgoldenrod':'#B8860B',
            'darkgray':'#A9A9A9','darkgrey':'#A9A9A9','darkgreen':'#006400','darkkhaki':'#BDB76B','darkmagenta':'#8B008B','darkolivegreen':'#556B2F',
            'darkorange':'#FF8C00','darkorchid':'#9932CC','darkred':'#8B0000','darksalmon':'#E9967A','darkseagreen':'#8FBC8F','darkslateblue':'#483D8B',
            'darkslategray':'#2F4F4F','darkslategrey':'#2F4F4F','darkturquoise':'#00CED1','darkviolet':'#9400D3','deeppink':'#FF1493','deepskyblue':'#00BFFF',
            'dimgray':'#696969','dimgrey':'#696969','dodgerblue':'#1E90FF','firebrick':'#B22222','floralwhite':'#FFFAF0','forestgreen':'#228B22',
            'fuchsia':'#FF00FF','gainsboro':'#DCDCDC','ghostwhite':'#F8F8FF','gold':'#FFD700','goldenrod':'#DAA520','gray':'#808080','grey':'#808080',
            'green':'#008000','greenyellow':'#ADFF2F','honeydew':'#F0FFF0','hotpink':'#FF69B4','indianred':'#CD5C5C','indigo':'#4B0082','ivory':'#FFFFF0',
            'khaki':'#F0E68C','lavender':'#E6E6FA','lavenderblush':'#FFF0F5','lawngreen':'#7CFC00','lemonchiffon':'#FFFACD','lightblue':'#ADD8E6',
            'lightcoral':'#F08080','lightcyan':'#E0FFFF','lightgoldenrodyellow':'#FAFAD2','lightgray':'#D3D3D3','lightgrey':'#D3D3D3','lightgreen':'#90EE90',
            'lightpink':'#FFB6C1','lightsalmon':'#FFA07A','lightseagreen':'#20B2AA','lightskyblue':'#87CEFA','lightslategray':'#778899',
            'lightslategrey':'#778899','lightsteelblue':'#B0C4DE','lightyellow':'#FFFFE0','lime':'#00FF00','limegreen':'#32CD32','linen':'#FAF0E6',
            'magenta':'#FF00FF','maroon':'#800000','mediumaquamarine':'#66CDAA','mediumblue':'#0000CD','mediumorchid':'#BA55D3','mediumpurple':'#9370D8',
            'mediumseagreen':'#3CB371','mediumslateblue':'#7B68EE','mediumspringgreen':'#00FA9A','mediumturquoise':'#48D1CC','mediumvioletred':'#C71585',
            'midnightblue':'#191970','mintcream':'#F5FFFA','mistyrose':'#FFE4E1','moccasin':'#FFE4B5','navajowhite':'#FFDEAD','navy':'#000080','oldlace':'#FDF5E6',
            'olive':'#808000','olivedrab':'#6B8E23','orange':'#FFA500','orangered':'#FF4500','orchid':'#DA70D6','palegoldenrod':'#EEE8AA',
            'palegreen':'#98FB98','paleturquoise':'#AFEEEE','palevioletred':'#D87093','papayawhip':'#FFEFD5','peachpuff':'#FFDAB9','peru':'#CD853F',
            'pink':'#FFC0CB','plum':'#DDA0DD','powderblue':'#B0E0E6','purple':'#800080','red':'#FF0000','rosybrown':'#BC8F8F','royalblue':'#4169E1',
            'saddlebrown':'#8B4513','salmon':'#FA8072','sandybrown':'#F4A460','seagreen':'#2E8B57','seashell':'#FFF5EE','sienna':'#A0522D','silver':'#C0C0C0',
            'skyblue':'#87CEEB','slateblue':'#6A5ACD','slategray':'#708090','slategrey':'#708090','snow':'#FFFAFA','springgreen':'#00FF7F',
            'steelblue':'#4682B4','tan':'#D2B48C','teal':'#008080','thistle':'#D8BFD8','tomato':'#FF6347','turquoise':'#40E0D0','violet':'#EE82EE'
        };

        // helpers
        var absround = function(number){
            return (0.5 + number) << 0;
        };

        var hue2rgb = function(a, b, c) {  // http://www.w3.org/TR/css3-color/#hsl-color
            if(c < 0) c += 1;
            if(c > 1) c -= 1;
            if(c < 1/6) return a + (b - a) * 6 * c;
            if(c < 1/2) return b;
            if(c < 2/3) return a + (b - a) * (2/3 - c) * 6;
            return a;
        };

        var p2v = function(p){
            return isPercent.test(p) ? absround(parseInt(p) * 2.55) : p;
        };

        var isNamedColor = function(key){
            var lc = ('' + key).toLowerCase();
            return namedColors.hasOwnProperty(lc)
                ? namedColors[lc]
                : null;
        };

        // patterns
        var isHex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
        var isHSL = /^hsla?\((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?\)$/;
        var isRGB = /^rgba?\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?\)$/;
        var isPercent = /^\d+(\.\d+)*%$/;

        var hexBit = /([0-9a-f])/gi;
        var leadHex = /^#/;

        var matchHSL = /^hsla?\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%(,\s*([01]?\.?\d*))?\)$/;
        var matchRGB = /^rgba?\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*([01]?\.?\d*))?\)$/;

        /**
         * Color instance - get, update and output a Color between structures.
         * @constructor
         * @param {mixed} value Accepts any valid CSS color value e.g., #FF9900, rgb(255, 153, 0), rgba(100%, 40%, 0%, 0.8);
         * a hash with properties mapped to the Color instance e.g., red, green, saturation, brightness;
         * another Color instance; a numeric color value; a named CSS color
         * @class Instances of the Color class serve as abstract reprentations of the color itself, and don't need to be
         * transformed from one format to another.  A single Color instance can have any component (red, green, blue, hue, saturation, lightness, brightness,
         * alpha) updated regardless of the source.  Further, all other components will be normalized automatically.  If a Color is instanced using a hex value,
         * it can have it's lightness component updated directly despite lightness being a HSL component.  Further, the same color instance can output it's
         * component values in any format without any extra conversions.  Conversion methods (getRGB, getHex) are provided just as helpers, and don't perform any
         * actual transformations.  They are not required for use or translation.  The standard component parts are available as instance methods - passing a value
         * argument to set, and each return the value as well (with or without setter arguments).  These components perform transformations and dispatch events, and
         * can be used without any sugar to manage the Color instance.
         * Component methods include:
         * .red()
         * .green()
         * .blue()
         * .hue()
         * .saturation()
         * .lightness()
         * .brightness()
         * .hex()
         * .decimal()
         * </ul>
         * @example
         * // instancing...
         * new Color();
         * new Color('#FF9900');
         * new Color(element.style.color);
         * new Color('pink');
         * new Color(123456);
         * new Color({ red : 255, green : 100, blue : 0 });
         * new Color(colorInstance);
         * // usage...
         * var color = new Color('#FF9900');
         * color.brightness(20);
         * element.style.backgroundColor = color;
         * console.log(color.getRGB());
         * console.log(color.saturation());
         */
        function Color(value){

            this._listeners = {};

            this.subscribe(Events.RGB_UPDATED, this._RGBUpdated);
            this.subscribe(Events.HEX_UPDATED, this._HEXUpdated);
            this.subscribe(Events.HSL_UPDATED, this._HSLUpdated);
            this.subscribe(Events.HSV_UPDATED, this._HSVUpdated);
            this.subscribe(Events.INT_UPDATED, this._INTUpdated);

            this.parse(value);

        };

        Color.prototype._decimal = 0;  // 0 - 16777215
        Color.prototype._hex = '#000000';  // #000000 - #FFFFFF
        Color.prototype._red = 0;  // 0 - 255
        Color.prototype._green = 0;  // 0 - 255
        Color.prototype._blue = 0;  // 0 - 255
        Color.prototype._hue = 0;  // 0 - 360
        Color.prototype._saturation = 0;  // 0 - 100
        Color.prototype._lightness = 0;  // 0 - 100
        Color.prototype._brightness = 0;  // 0 - 100
        Color.prototype._alpha = 1;  // 0 - 1

        /**
         * Convert mixed variable to Color component properties, and adopt those properties.
         * @function
         * @param {mixed} value Accepts any valid CSS color value e.g., #FF9900, rgb(255, 153, 0), rgba(100%, 40%, 0%, 0.8);
         * a hash with properties mapped to the Color instance e.g., red, green, saturation, brightness;
         * another Color instance; a numeric color value; a named CSS color
         * @returns this
         * @example
         * var color = new Color();
         * color.parse();
         * color.parse('#FF9900');
         * color.parse(element.style.color);
         * color.parse('pink');
         * color.parse(123456);
         * color.parse({ red : 255, green : 100, blue : 0 });
         * color.parse(colorInstance);
         */
        Color.prototype.parse = function(value){
            if(typeof value == 'undefined'){
                return this;
            };
            switch(true){
                case isFinite(value) :
                    this.decimal(value);
                    this.output = Color.INT;
                    return this;
                case (value instanceof Color) :
                    this.copy(value);
                    return this;
                default :
                    switch(typeof value) {
                        case 'object' :
                            this.set(value);
                            return this;
                        case 'string' :
                            switch(true){
                                case (namedColors.hasOwnProperty(value)) :
                                    value = namedColors[value];
                                    var stripped = value.replace(leadHex, '');
                                    this.decimal(parseInt(stripped, 16));
                                    return this;
                                case isHex.test(value) :
                                    var stripped = value.replace(leadHex, '');
                                    if(stripped.length == 3) {
                                        stripped = stripped.replace(hexBit, '$1$1');
                                    };
                                    this.decimal(parseInt(stripped, 16));
                                    return this;
                                case isRGB.test(value) :
                                    var parts = value.match(matchRGB);
                                    this.red(p2v(parts[1]));
                                    this.green(p2v(parts[2]));
                                    this.blue(p2v(parts[3]));
                                    this.alpha(parseFloat(parts[5]) || 1);
                                    this.output = (isPercent.test(parts[1]) ? 2 : 1) + (parts[5] ? 2 : 0);
                                    return this;
                                case isHSL.test(value) :
                                    var parts = value.match(matchHSL);
                                    this.hue(parseInt(parts[1]));
                                    this.saturation(parseInt(parts[2]));
                                    this.lightness(parseInt(parts[3]));
                                    this.alpha(parseFloat(parts[5]) || 1);
                                    this.output = parts[5] ? 6: 5;
                                    return this;
                            };
                    };

            };
            return this;
        };

        /**
         * Create a duplicate of this Color instance
         * @function
         * @returns Color
         */
        Color.prototype.clone = function(){
            return new Color(this.decimal());
        };

        /**
         * Copy values from another Color instance
         * @function
         * @param {Color} color Color instance to copy values from
         * @returns this
         */
        Color.prototype.copy = function(color){
            return this.set(color.decimal());
        };

        /**
         * Set a color component value
         * @function
         * @param {string|object|number} key Name of the color component to defined, or a hash of key:value pairs, or a single numeric value
         * @param {string|number} value - Value of the color component to be set
         * @returns this
         * @example
         * var color = new Color();
         * color.set('lightness', 100);
         * color.set({ red : 255, green : 100 });
         * color.set(123456);
         */
        Color.prototype.set = function(key, value){
            if(arguments.length == 1){
                if(typeof key == 'object'){
                    for(var p in key){
                        if(typeof this[p] == 'function'){
                            this[p](key[p]);
                        };
                    };
                } else if(isFinite(key)){
                    this.decimal(key);
                }
            } else if(typeof this[key] == 'function'){
                this[key](value);
            };
            return this;
        };

        /**
         * sets the invoking Color instance component values to a point between the original value and the destination Color instance component value, multiplied by the factor
         * @function
         * @param {Color} destination Color instance to serve as the termination of the interpolation
         * @param {number} factor 0-1, where 0 is the origin Color and 1 is the destination Color, and 0.5 is halfway between.  This method will "blend" the colors.
         * @returns this
         * @example
         * var orange = new Color('#FF9900');
         * var white = new Color('#FFFFFF');
         * orange.interpolate(white, 0.5);
         */
        Color.prototype.interpolate = function(destination, factor){
            if(!(destination instanceof Color)){
                destination = new Color(destination);
            };
            this._red = absround( +(this._red) + (destination._red - this._red) * factor );
            this._green = absround( +(this._green) + (destination._green - this._green) * factor );
            this._blue = absround( +(this._blue) + (destination._blue - this._blue) * factor );
            this._alpha = absround( +(this._alpha) + (destination._alpha - this._alpha) * factor );
            this.broadcast(Events.RGB_UPDATED);
            this.broadcast(Events.UPDATED);
            return this;
        };

        Color.prototype._RGB2HSL = function(){

            var r = this._red / 255;
            var g = this._green / 255;
            var b = this._blue / 255;

            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var l = (max + min) / 2;
            var v = max;

            if(max == min) {
                this._hue = 0;
                this._saturation = 0;
                this._lightness = absround(l * 100);
                this._brightness = absround(v * 100);
                return;
            };

            var d = max - min;
            var s = d / ( ( l <= 0.5) ? (max + min) : (2 - max - min) );
            var h = ((max == r)
                ? (g - b) / d + (g < b ? 6 : 0)
                : (max == g)
                ? ((b - r) / d + 2)
                : ((r - g) / d + 4)) / 6;

            this._hue = absround(h * 360);
            this._saturation = absround(s * 100);
            this._lightness = absround(l * 100);
            this._brightness = absround(v * 100);
        };
        Color.prototype._HSL2RGB = function(){
            var h = this._hue / 360;
            var s = this._saturation / 100;
            var l = this._lightness / 100;
            var q = l < 0.5	? l * (1 + s) : (l + s - l * s);
            var p = 2 * l - q;
            this._red = absround(hue2rgb(p, q, h + 1/3) * 255);
            this._green = absround(hue2rgb(p, q, h) * 255);
            this._blue = absround(hue2rgb(p, q, h - 1/3) * 255);
        };
        Color.prototype._HSV2RGB = function(){  // http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
            var h = this._hue / 360;
            var s = this._saturation / 100;
            var v = this._brightness / 100;
            var r = 0;
            var g = 0;
            var b = 0;
            var i = Math.floor(h * 6);
            var f = h * 6 - i;
            var p = v * (1 - s);
            var q = v * (1 - f * s);
            var t = v * (1 - (1 - f) * s);
            switch(i % 6){
                case 0 :
                    r = v, g = t, b = p;
                    break;
                case 1 :
                    r = q, g = v, b = p;
                    break;
                case 2 :
                    r = p, g = v, b = t;
                    break;
                case 3 :
                    r = p, g = q, b = v;
                    break;
                case 4 :
                    r = t, g = p, b = v
                    break;
                case 5 :
                    r = v, g = p, b = q;
                    break;
            }
            this._red = absround(r * 255);
            this._green = absround(g * 255);
            this._blue = absround(b * 255);
        };
        Color.prototype._INT2HEX = function(){
            var x = this._decimal.toString(16);
            x = '000000'.substr(0, 6 - x.length) + x;
            this._hex = '#' + x.toUpperCase();
        };
        Color.prototype._INT2RGB = function(){
            this._red = this._decimal >> 16;
            this._green = (this._decimal >> 8) & 0xFF;
            this._blue = this._decimal & 0xFF;
        };
        Color.prototype._HEX2INT = function(){
            this._decimal = parseInt(this._hex, 16);
        };
        Color.prototype._RGB2INT = function(){
            this._decimal = (this._red << 16 | (this._green << 8) & 0xffff | this._blue);
        };


        Color.prototype._RGBUpdated = function(){
            this._RGB2INT();  // populate INT values
            this._RGB2HSL();  // populate HSL values
            this._INT2HEX();  // populate HEX values
        };
        Color.prototype._HSLUpdated = function(){
            this._HSL2RGB();  // populate RGB values
            this._RGB2INT();  // populate INT values
            this._INT2HEX();  // populate HEX values
        };
        Color.prototype._HSVUpdated = function(){
            this._HSV2RGB();  // populate RGB values
            this._RGB2INT();  // populate INT values
            this._INT2HEX();  // populate HEX values
        };
        Color.prototype._HEXUpdated = function(){
            this._HEX2INT();  // populate INT values
            this._INT2RGB();  // populate RGB values
            this._RGB2HSL();  // populate HSL values
        };
        Color.prototype._INTUpdated = function(){
            this._INT2RGB();  // populate RGB values
            this._RGB2HSL();  // populate HSL values
            this._INT2HEX();  // populate HEX values
        };

        Color.prototype._broadcastUpdate = function(){
            this.broadcast(Event.UPDATED);
        };

        /**
         * Set the decimal value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {number} value 0 (black) to 16777215 (white) - the decimal value to set
         * @returns Number
         * @example
         * var color = new Color();
         * color.decimal(123456);
         */
        Color.prototype.decimal = function(value){
            return this._handle('_decimal', value, Events.INT_UPDATED);
        };

        /**
         * Set the hex value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {string} value Hex value to be set
         * @returns String
         * @example
         * var color = new Color();
         * color.hex('#FF9900');
         * color.hex('#CCC');
         */
        Color.prototype.hex = function(value){
            return this._handle('_hex', value, Events.HEX_UPDATED);
        };

        /**
         * Set the red component value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {number} value 0 - 255 red component value to set
         * @returns Number
         * @example
         * var color = new Color();
         * color.red(125);
         */
        Color.prototype.red = function(value){
            return this._handle('_red', value, Events.RGB_UPDATED);
        };
        /**
         * Set the green component value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {number} value 0 - 255 green component value to set
         * @returns Number
         * @example
         * var color = new Color();
         * color.green(125);
         */
        Color.prototype.green = function(value){
            return this._handle('_green', value, Events.RGB_UPDATED);
        };
        /**
         * Set the blue component value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {number} value 0 - 255 blue component value to set
         * @returns Number
         * @example
         * var color = new Color();
         * color.blue(125);
         */
        Color.prototype.blue = function(value){
            return this._handle('_blue', value, Events.RGB_UPDATED);
        };

        /**
         * Set the hue component value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {number} value 0 - 360 hue component value to set
         * @returns Number
         * @example
         * var color = new Color();
         * color.hue(280);
         */
        Color.prototype.hue = function(value){
            return this._handle('_hue', value, Events.HSL_UPDATED);
        };

        /**
         * Set the saturation component value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {number} value 0 - 100 saturation component value to set
         * @returns Number
         * @example
         * var color = new Color();
         * color.saturation(280);
         */
        Color.prototype.saturation = function(value){
            return this._handle('_saturation', value, Events.HSL_UPDATED);
        };

        /**
         * Set the lightness component value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {number} value 0 - 100 lightness component value to set
         * @returns Number
         * @example
         * var color = new Color();
         * color.lightness(80);
         */
        Color.prototype.lightness = function(value){
            return this._handle('_lightness', value, Events.HSL_UPDATED);
        };

        /**
         * Set the brightness component value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {number} value 0 - 100 brightness component value to set
         * @returns Number
         * @example
         * var color = new Color();
         * color.brightness(80);
         */
        Color.prototype.brightness = function(value){
            return this._handle('_brightness', value, Events.HSV_UPDATED);
        };

        /**
         * Set the opacity value of the color, updates all other components, and dispatches Event.UPDATED
         * @function
         * @param {number} value 0 - 1 opacity component value to set
         * @returns Number
         * @example
         * var color = new Color();
         * color.alpha(0.5);
         */
        Color.prototype.alpha = function(value){
            return this._handle('_alpha', value);
        };


        Color.prototype._handle = function(prop, value, event){
            if(typeof this[prop] != 'undefined'){
                if(typeof value != 'undefined'){
                    if(value != this[prop]){
                        this[prop] = value;
                        if(event){
                            this.broadcast(event);
                        };
                    };
                    this.broadcast(Event.UPDATED);
                };
            };
            return this[prop];
        };

        /**
         * Returns a CSS-formatted hex string [e.g., #FF9900] from the Color's component values
         * @function
         * @returns String
         * @example
         * var color = new Color();
         * element.style.backgroundColor = color.getHex();
         */
        Color.prototype.getHex = function(){
            return this._hex;
        };
        /**
         * Returns a CSS-formatted RGB string [e.g., rgb(255, 153, 0)] from the Color's component values
         * @function
         * @returns String
         * @example
         * var color = new Color();
         * element.style.backgroundColor = color.getRGB();
         */
        Color.prototype.getRGB = function(){
            var components = [absround(this._red), absround(this._green), absround(this._blue)];
            return 'rgb(' + components.join(', ') + ')';
        };
        /**
         * Returns a CSS-formatted percentile RGB string [e.g., rgb(100%, 50%, 0)] from the Color's component values
         * @function
         * @returns String
         * @example
         * var color = new Color();
         * element.style.backgroundColor = color.getPRGB();
         */
        Color.prototype.getPRGB = function(){
            var components = [absround(100 * this._red / 255) + '%', absround(100 * this._green / 255) + '%', absround(100 * this._blue / 255) + '%'];
            return 'rgb(' + components.join(', ') + ')';
        };
        /**
         * Returns a CSS-formatted RGBA string [e.g., rgba(255, 153, 0, 0.5)] from the Color's component values
         * @function
         * @returns String
         * @example
         * var color = new Color();
         * element.style.backgroundColor = color.getRGBA();
         */
        Color.prototype.getRGBA = function(){
            var components = [absround(this._red), absround(this._green), absround(this._blue), this._alpha];
            return 'rgba(' + components.join(', ') + ')';
        };
        /**
         * Returns a CSS-formatted percentile RGBA string [e.g., rgba(100%, 50%, 0%, 0.5)] from the Color's component values
         * @function
         * @returns String
         * @example
         * var color = new Color();
         * element.style.backgroundColor = color.getPRGBA();
         */
        Color.prototype.getPRGBA = function(){
            var components = [absround(100 * this._red / 255) + '%', absround(100 * this._green / 255) + '%', absround(100 * this._blue / 255) + '%', this._alpha];
            return 'rgba(' + components.join(', ') + ')';
        };
        /**
         * Returns a CSS-formatted HSL string [e.g., hsl(360, 100%, 100%)] from the Color's component values
         * @function
         * @returns String
         * @example
         * var color = new Color();
         * element.style.backgroundColor = color.getHSL();
         */
        Color.prototype.getHSL = function(){
            var components = [absround(this._hue), absround(this._saturation) + '%', absround(this._lightness) + '%'];
            return 'hsl(' + components.join(', ') + ')';
        };
        /**
         * Returns a CSS-formatted HSLA string [e.g., hsl(360, 100%, 100%, 0.5)] from the Color's component values
         * @function
         * @returns String
         * @example
         * var color = new Color();
         * element.style.backgroundColor = color.getHSLA();
         */
        Color.prototype.getHSLA = function(){
            var components = [absround(this._hue), absround(this._saturation) + '%', absround(this._lightness) + '%', this._alpha];
            return 'hsla(' + components.join(', ') + ')';
        };

        /**
         * Returns a tokenized string from the Color's component values
         * @function
         * @param {string} string The string to return, with tokens expressed as %token% that are replaced with component values.  Tokens are as follows:
         * r : red
         * g : green
         * b : blue
         * h : hue
         * s : saturation
         * l : lightness
         * v : brightness
         * a : alpha
         * x : hex
         * i : value
         * @returns String
         * @example
         * var color = new Color('#FF9900');
         * console.log(color.format('red=%r%, green=%g%, blue=%b%));
         */
        Color.prototype.format = function(string){
            var tokens = {
                r : this._red,
                g : this._green,
                b : this._blue,
                h : this._hue,
                s : this._saturation,
                l : this._lightness,
                v : this._brightness,
                a : this._alpha,
                x : this._hex,
                d : this._decimal
            };
            for(var token in tokens){
                string = string.split('%' + token + '%').join(tokens[token]);
            };
            return string;
        };

        /**
         * Sets the format used by the native toString method
         * Color.HEX outputs #FF9900
         * Color.RGB outputs rgb(255, 153, 0)
         * Color.PRGB outputs rgb(100%, 50%, 0)
         * Color.RGBA outputs rgba(255, 153, 0, 0.5)
         * Color.PRGBA outputs rgba(100%, 50%, 0, 0.5)
         * Color.HSL outputs hsl(360, 100%, 80%)
         * Color.HSLA outputs hsla(360, 100%, 80%, 0.5)
         * @example
         * var color = new Color('#FF9900');
         * color.format = Color.RGB;
         * element.style.backgroundColor = color;
         * element.style.color = color;
         */
        Color.prototype.output = 0;

        Color.HEX = 0;  // toString returns hex: #ABC123
        Color.RGB = 1;  // toString returns rgb: rgb(0, 100, 255)
        Color.PRGB = 2;  // toString returns percent rgb: rgb(0%, 40%, 100%)
        Color.RGBA = 3;  // toString returns rgba: rgba(0, 100, 255, 0.5)
        Color.PRGBA = 4;  // toString returns percent rgba: rgba(0%, 40%, 100%, 0.5)
        Color.HSL = 5;  // toString returns hsl: hsl(360, 50%, 50%)
        Color.HSLA = 6;  // toString returns hsla: hsla(360, 50%, 50%, 0.5)
        Color.INT = 7;  // toString returns decimal value

        Color.prototype.toString = function(){
            switch(this.output){
                case 0 :  // Color.HEX
                    return this.getHex();
                case 1 :  // Color.RGB
                    return this.getRGB();
                case 2 :  // Color.PRGB
                    return this.getPRGB();
                case 3 :  // Color.RGBA
                    return this.getRGBA();
                case 4 :  // Color.PRGBA
                    return this.getPRGBA();
                case 5 :  // Color.HSL
                    return this.getHSL();
                case 6 :  // Color.HSLA
                    return this.getHSLA();
                case 7 :  // Color.INT
                    return this._decimal;
            };
            return this.getHex();
        };

        // Event Management
        Color.prototype._listeners = null;
        Color.prototype._isSubscribed = function(type){
            return this._listeners[type] != null;
        };
        /**
         * @function
         * @param {string} type Event type to listen for
         * @param {function} callback listener to register to the event
         * @example
         * var color = new Color();
         * color.subscribe(Color.Event.UPDATED, function(){
	*   alert('this color has been updated');
	* });
         * color.red(255);
         */
        Color.prototype.subscribe = function(type, callback){
            if(!this._isSubscribed(type)) {
                this._listeners[type] = [];
            };
            this._listeners[type].push(callback);
        };

        /**
         * @function
         * @param {string} type Event type to remove the listener from
         * @param {function} callback listener to unregister from the event
         * @example
         * var color = new Color();
         * var handler = function(){
	*   console.log('this color has been updated');
	* });
         * color.subscribe(Color.Event.UPDATED, handler);
         * color.red(255);
         * color.unsubscribe(Color.Event.UPDATED, handler);
         * color.red(0);
         */
        Color.prototype.unsubscribe = function(type, callback){
            if(!this._isSubscribed(type)) {
                return;
            };
            var stack = this._listeners[type];
            for(var i = 0, l = stack.length; i < l; i++){
                if(stack[i] === callback){
                    stack.splice(i, 1);
                    return this.unsubscribe(type, callback);
                };
            };
        };

        /**
         * @function
         * @param {string} type Event type to dispatch
         * @param {array} params Array of arguments to pass to listener
         * @example
         * var color = new Color();
         * var handler = function(a, b){
	*   console.log('a=' + a, 'b=' + b);
	* });
         * color.subscribe('arbitraryEvent', handler);
         * color.broadcast('arbitraryEvent', ['A', 'B']);
         */
        Color.prototype.broadcast = function(type, params){
            if(!this._isSubscribed(type)) {
                return;
            }
            var stack = this._listeners[type];
            var l = stack.length;
            for(var i = 0; i < l; i++) {
                stack[i].apply(this, params);
            }
        };

        /**
         * Blends the color from it's current state to the target Color over the duration
         * @function
         * @param {number} duration duration of tween in millisecond
         * @param {Color} color destination color
         * @returns number
         * @example
         * var color = new Color('#FF9900');
         * color.tween(2000, '#FFFFFF');
         */
        Color.prototype.tween = function(duration, color){
            if(!(color instanceof Color)){
                color = new Color(color);
            };
            var start = +(new Date());
            var ref = this;
            this.broadcast('tweenStart');
            var interval = setInterval(function(){
                var ellapsed = +(new Date()) - start;
                var delta = Math.min(1, ellapsed / duration);
                ref.interpolate(color, delta);
                ref.broadcast('tweenProgress');
                if(delta == 1){
                    clearInterval(interval);
                    ref.broadcast('tweenComplete');
                };
            }, 20);
            return interval;  // return so it can be cancelled early
        };

        /**
         * Binds the color to an object's property - whenever the Color is updated, the property will be set to the value of the Color instance's toString method
         * @function
         * @param {object} object Object containing the property to update
         * @param {string} property Name of the property to update
         * @example
         * var color = new Color('#FF9900');
         * color.bind(someElement.style, 'backgroundColor');
         */
        Color.prototype.bind = function(object, property){
            var ref = this;
            this.subscribe('updated', function(){
                object[property] = ref.toString();
            });
        };


        /**
         * [static] Returns a Color instance of a random color
         * @function
         * @returns Color
         * @example
         * var gray = Color.interpolate('#FFFFFF', '#000000', 0.5);
         */
        Color.random = function(){
            return new Color(absround(Math.random() * 16777215));
        };


        /**
         * [static] Returns a Color instance bound to an object's property, set to the value of the property
         * @function
         * @param {object} object Object containing the property to update
         * @param {string} property Name of the property to update
         * @returns Color
         * @example
         * var color = Color.bind(someElement.style, 'backgroundColor');
         */
        Color.bind = function(object, property){
            var color = new Color(object[property]);
            color.bind(object, property);
            return color;
        };

        Color.Events = Events;

        if (typeof define === 'function') {
            define('Color', [], function() {
                return Color;
            });
        };

        return Color;

    })();

    return {
        /**
         * @ngdoc method
         * @methodOf imx.colorPicker.provider:imxColorProvider
         * @name $new
         * @param {string} colorStr Color in any string format, ex: #FFFFFF, rgb(0,0,0) etc..
         * @returns {Color} Color instance see {@link http://github.com}
         * @description
         * Create new Color instance.
         */
        $new: function (colorStr) {
            return new Color(colorStr);
        }
    };
});;/**
 * @ngdoc service
 * @name imx.colorPicker.service:imxColorStoreService
 *
 */
angular.module('imx.colorPicker').service('imxColorStoreService', ['$window', function($window) {
    "use strict";
    var prefix = "imx.colorPicker.pal.";

    /**
     * @ngdoc method
     * @name getPalette
     * @methodOf imx.colorPicker.service:imxColorStoreService
     * @param {string} paletteId Palette identifier
     * @returns {Array} Palette (array of hex strings)
     */
    function getPalette(paletteId) {
        var paletteStr = localStorage.getItem(prefix + paletteId);
        if (!paletteStr) {
            return [];
        }
        return JSON.parse(paletteStr);
    }

    function writePalette(paletteId, data) {
        localStorage.setItem(prefix + paletteId, JSON.stringify(data));
    }

    /**
     * @ngdoc method
     * @name storeColor
     * @methodOf imx.colorPicker.service:imxColorStoreService
     * @param {string} color Color hex
     * @param {string} paletteId Palette identifier
     * @param {boolean} [prepend=false] Prepend value to palette
     * @param {number} [limit=100] Limit palette size
     */
    function storeColor(color, paletteId, prepend, limit) {
        var palette = getPalette(paletteId);
        if(palette.indexOf(color) !== -1) {
            return;
        }
        if (!prepend) {
            palette.push(color);
        } else {
            palette.splice(0,0,color);
        }

        if (!limit) {
            limit = 100;
        }

        writePalette(paletteId, palette.slice(0, limit));
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].apply({}, [paletteId]);
        }
    }

    /**
     * @ngdoc method
     * @name removeColor
     * @methodOf imx.colorPicker.service:imxColorStoreService
     * @param {string} color Color hex
     * @param {string} paletteId Palette identifier
     */
    function removeColor(color, paletteId) {
        var palette = getPalette(paletteId);
        if(palette.indexOf(color) === -1) {
            return;
        }
        palette.splice(palette.indexOf(color), 1);
        writePalette(paletteId, palette);
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].apply({}, [paletteId]);
        }
    }

    /**
     * @ngdoc method
     * @name hasColor
     * @methodOf imx.colorPicker.service:imxColorStoreService
     * @param {string} color Color hex
     * @param {string} paletteId Palette identifier
     * @returns {boolean} Color exists on palette
     */
    function hasColor(color, paletteId) {
        var palette = getPalette(paletteId);
        return palette.indexOf(color) !== -1;
    }

    var callbacks = [];

    /**
     * @ngdoc method
     * @name onPaletteChanged
     * @methodOf imx.colorPicker.service:imxColorStoreService
     * @param {callback} func Callback function when palette changed. Callback signature: `function (paletteId) { }` paletteId could be empty string if all palette updated.
     */
    function onPaletteChanged(func) {
        callbacks.push(func);
    }

    angular.element($window).on('storage', function (event) {
        var key = event.key.replace(prefix, "");
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].apply({}, [key]);
        }
    });

    return {
        storeColor: storeColor,
        removeColor: removeColor,
        hasColor: hasColor,
        getPalette: getPalette,
        onPaletteChanged: onPaletteChanged
    };
}]);;(function(){
    "use strict";

    angular.module("imx.colorPicker").service('imxPaletteService', ['imxColorProvider', function(imxColorProvider) {
        /**
         *
         * @param {string} color
         */
        function createColor(color) {
            return new imxColorProvider.$new(color);
        }

        function toHex(clr) {
            var color = new imxColorProvider.$new(clr);
            return color.getHex();
        }

        function createSolidColors(base, lightness, renderGrey) {
            var newColors = [];
            var baseColors = ['#333ECF', '#6A3FC4', '#C53E3E', '#E89C30', '#E3E31F', '#40C353'];
            var lightnessValues = [73, 65, 51, 43, 34, 24];
            var colorDisposable = new imxColorProvider.$new();
            if (base) {
                baseColors = base;
            }
            if (lightness) {
                lightnessValues = lightness;
            }
            if (renderGrey === undefined) {
                renderGrey = true;
            }
            var greyStep = 50 / baseColors.length;
            var currentGrey1 = 100;
            var currentGrey2 = 50;
            for(var i in baseColors) {
                if (baseColors.hasOwnProperty(i)) {
                    if(renderGrey) {
                        colorDisposable.parse("#000000");
                        colorDisposable.lightness(currentGrey1);
                        newColors.push(colorDisposable.getHex());
                        colorDisposable.lightness(currentGrey2);
                        newColors.push(colorDisposable.getHex());
                    }
                    colorDisposable.parse(baseColors[i]);
                    for(var j = 0; j < lightnessValues.length; j++) {
                        colorDisposable.lightness(lightnessValues[j]);
                        newColors.push(colorDisposable.getHex());
                    }
                    currentGrey1 -= greyStep;
                    currentGrey2 -= greyStep;
                }
            }
            return newColors;
        }

        return {
            createColor: createColor,
            createSolidColors: createSolidColors,
            toHex: toHex
        };
    }]);
}())

