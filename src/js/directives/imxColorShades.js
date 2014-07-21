angular.module('imx.colorpicker').directive('imxColorShades', ['imxPaletteService', function (paletteService) {
    "use strict";
    return {
        restrict: 'AE',
        replace: true,
        template: "<div class='imx-color-shades-wrapper'>" +
                    "<canvas width='{{canvasWidth}}' height='10' class='imx-color-shades-versions'></canvas>" +
                    "<canvas width='{{canvasWidth}}' height='{{canvasHeight}}' imx-resize='onResize(width, height)' class='imx-color-shades'></canvas>" +
                    "<canvas width='{{canvasWidth}}' height='20' class='imx-color-shades-hue'></canvas>" +
                    "<canvas width='{{canvasWidth}}' height='{{canvasHeight + 30}}' class='imx-color-shades-chrome' ng-click='chromeClicked($event)'></canvas>" +
                    "</div>",
        scope: {
            selectedColor: "=color"
        },
        link: function ($scope, $element, attrs) {
            var hueRendered = false;
            function renderImage() {
                //Render saturation and brightness
                var color = paletteService.createColor($scope.selectedColor);
                var brightness = color.brightness(),
                    saturation = color.saturation();
                color.lightness(50);
                var canvas = $element.children()[1];
                var width = canvas.width,
                    height = canvas.height;
                /**
                 *
                 * @type {CanvasRenderingContext2D}
                 */
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, width, height);
                var hex = color.getHex();
                ctx.fillStyle = hex;
                ctx.fillRect(0, 0, width, height);

                var grd = ctx.createLinearGradient(0, 0, width, 0);
                grd.addColorStop(0, "rgba(255,255,255,1.0");
                grd.addColorStop(1, "rgba(255,255,255,0.0");
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, width, height);

                var grd2 = ctx.createLinearGradient(0, 0, 0, height);
                grd2.addColorStop(0, "rgba(0,0,0,0.0");
                grd2.addColorStop(1, "rgba(0,0,0,1.0");
                ctx.fillStyle = grd2;
                ctx.fillRect(0, 0, width, height);
                if (!hueRendered) {
                    renderHue();
                }

                //Render versions
                var versionCanvas = $element.children()[0];
                var versionCtx = versionCanvas.getContext("2d");
                var versionColors = paletteService.createSolidColors([hex], undefined, false);
                var versionWidth = width / versionColors.length;
                for (var i = 0; i < versionColors.length; i++) {
                    versionCtx.fillStyle = versionColors[i];
                    versionCtx.fillRect(i*versionWidth, 0, versionWidth, 10);
                }
            }

            function renderHue() {
                //Render hue
                var hueCanvas = $element.children()[2];
                var width = hueCanvas.width;
                var step = 360 / width;
                var ctx = hueCanvas.getContext('2d');
                for (var i = 0; i < width ; i++) {
                    ctx.strokeStyle = "hsl("+(i*step)+",100%,50%)";
                    ctx.beginPath();
                    ctx.moveTo(i, 0);
                    ctx.lineTo(i, 20);
                    ctx.stroke();
                }
            }

            function renderChrome() {
                //Mark hue
                var canvas = $element.children()[3];
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "white";

                var hueStart = canvas.width - 20;
                var color = paletteService.createColor($scope.selectedColor);
                var hue = color.hue();
                var huePercentage = hue / 360 * 100;
                var centerX = Math.round(canvas.width * (huePercentage / 100.0));
                var centerY = hueStart + 4;
                var radius = 4;

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                ctx.fill();

                //Mark brightness and saturation
                var saturationPosition = ((color.saturation()) / 100) * canvas.width;
                var brightnessPosition = (((100-color.brightness()) / 100) * (canvas.height - 30)) + 10;

                ctx.beginPath();
                if (color.lightness() < 50) {
                    ctx.strokeStyle = "white";
                } else {
                    ctx.strokeStyle = "black";
                }
                ctx.lineWidth = 2;
                ctx.arc(saturationPosition, brightnessPosition, radius, 0, 2 * Math.PI, false);
                ctx.stroke();

            }
            $scope.onResize = function (width, height) {
                $scope.canvasWidth = width;
                $scope.canvasHeight = height;
                renderImage();
                renderHue();
                renderChrome();
            };

            $scope.$watch('selectedColor', function() {
                renderImage();
                renderChrome();
            });
            $scope.canvasWidth = $element.children()[1].offsetWidth;
            $scope.canvasHeight = $element.children()[1].offsetHeight;

            $scope.chromeClicked = function($event) {
                var canvas = $element.children()[3];
                var p;
                if ($event.offsetY <= 10) {
                    //Variations clicked
                    p = $element.children()[0].getContext('2d').getImageData($event.offsetX, $event.offsetY, 1, 1).data;
                    $scope.selectedColor = paletteService.toHex({red: p[0], green: p[1], blue: p[2]});
                } else if ($event.offsetY > canvas.height - 20) {
                    //Hue clicked
                    p = $element.children()[2].getContext('2d').getImageData($event.offsetX, $event.offsetY - canvas.height + 20, 1, 1).data;
                    $scope.selectedColor = paletteService.toHex({red: p[0], green: p[1], blue: p[2]});
                } else {
                    //BS clicked
                    p = $element.children()[1].getContext('2d').getImageData($event.offsetX, $event.offsetY - 10, 1, 1).data;
                    $scope.selectedColor = paletteService.toHex({red: p[0], green: p[1], blue: p[2]});

                }
                $scope.$digest();
            };
        }
    };
}]);