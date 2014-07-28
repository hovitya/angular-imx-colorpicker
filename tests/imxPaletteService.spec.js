describe('imxPaletteService', function() {
    "use strict";
    var paletteService;

    beforeEach(function () {
        angular.mock.module("imx.colorPicker");
        inject(['imxPaletteService', function (imxPaletteService) {
            paletteService = imxPaletteService;
        }]);
    });

    describe('createSolidColors', function() {
        it('should return empty array', function() {
            var colors = paletteService.createSolidColors([]);
            expect(colors).toEqual([]);
        });
    });
});