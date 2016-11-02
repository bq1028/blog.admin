/**
 * 指令：滚动条
 * @author Philip
 */

define(['./directives', '../ui/scrollbar'], function (directives, Scrollbar) {
    'use strict';
    directives.directive('scrollbar', [function() {
        return {
            restrict: 'A',
            link: function (scope, ele, attrs) {
                var scrollbar = new Scrollbar(ele[0]);

                scope.$on('EVENT:SCROLL-CONTENTRESIZE', function() {
                    scrollbar.caculateScrollbarHeight();
                });
            }
        };
    }]);
});
