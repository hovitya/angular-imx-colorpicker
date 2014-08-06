/**
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
                format: "@format",
                closable: "@closable",
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

                scope.$watch('closable', function (newValue, oldValue) {
                    if(!newValue || newValue === undefined || newValue === null || newValue === "false") {
                        scope.onDemandMode = false;
                    } else {
                        scope.onDemandMode = true;
                    }
                });


                scope.close = function () {
                    imxColorStoreService.storeColor(scope.selectedColor, PaletteIds.History, true, 8);
                    scope.onClose({});
                };
            }
        };
    }]
);