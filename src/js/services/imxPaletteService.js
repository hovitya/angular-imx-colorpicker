(function(){
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

