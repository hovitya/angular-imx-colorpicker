angular.module('imxColorPickerTemplates', ['template/partials/colorPicker.html', 'template/partials/popover.html']);

angular.module("template/partials/colorPicker.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/partials/colorPicker.html",
    "<div class=\"imx-colorpicker-wrapper\">\n" +
    "    <!-- Fix header -->\n" +
    "        <div class=\"imx-colorpicker-block imx-colorpicker-header\">\n" +
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
    "                       ng-model-options=\"{ debounce: 1000 }\">\n" +
    "                <input type=\"text\"\n" +
    "                       ng-model=\"state.components.blue\"\n" +
    "                       ng-model-options=\"{ debounce: 1000 }\"\n" +
    "                       spellcheck=\"false\"\n" +
    "                       maxlength=\"3\"\n" +
    "                       class=\"imx-rgb imx-b\"\n" +
    "                       ng-mouseenter=\"bHover = true;\"\n" +
    "                       ng-mouseleave=\"bHover = false;\"\n" +
    "                       ng-focus=\"bActive = true;\"\n" +
    "                       ng-blur=\"bActive = false;\">\n" +
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
    "                       ng-model-options=\"{ debounce: : 1000 }\">\n" +
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
    "                       ng-model-options=\"{ debounce: 1000 }\">\n" +
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

angular.module("template/partials/popover.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/partials/popover.html",
    "<div class=\"imx-popup-wrapper imx-color-popup-wrapper\" ng-show=\"state.shown\">\n" +
    "    <div class=\"arrow-up left-side-arrow\" ng-show=\"state.up && state.left\"></div>\n" +
    "    <div class=\"arrow-up right-side-arrow\" ng-show=\"state.up && !state.left\"></div>\n" +
    "    <div class=\"arrow-clear\"></div>\n" +
    "    <div class=\"imx-popover-content\">\n" +
    "        <div ng-transclude></div>\n" +
    "    </div>\n" +
    "    <div class=\"bottom-arrow-container\">\n" +
    "        <div class=\"arrow-down left-side-arrow\" ng-show=\"!state.up && state.left\"></div>\n" +
    "        <div class=\"arrow-down right-side-arrow\" ng-show=\"!state.up && !state.left\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);
