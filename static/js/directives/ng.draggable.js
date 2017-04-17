/**
 * 指令：可拖拽
 * @author Philip
 */

define(['./directives', '../ui/draggable'], function (directives, Draggable) {
    'use strict';

    directives.directive('draggable', [function () {
        return {
            restrict: 'A',
            scrop: {
                onMove: '&',
                onDrop: '&'
            },
            link: function (scope, ele, attrs) {
                new Draggable(ele, scope.onMove, scope.onDrop);
            }
        };
    }]);
});
