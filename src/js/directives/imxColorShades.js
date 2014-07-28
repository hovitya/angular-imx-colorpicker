/**
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
}]);