/**
 * 指令：烟火
 * @author Philip
 */

define(['./directives', '../ui/fireworks'], function (directives, fireworks) {
    'use strict';
    directives.directive('fireworks', [function() {
        return {
            restrict: 'A',
            link: function () {
                fireworks();
            }
        };
    }]);
});
