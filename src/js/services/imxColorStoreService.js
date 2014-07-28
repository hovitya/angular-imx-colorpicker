/**
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
}]);