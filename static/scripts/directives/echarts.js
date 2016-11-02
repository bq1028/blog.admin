/**
 * 指令：echart
 * @author Philip
 */

define(['./directives'], function (directives) {
    'use strict';
    directives.directive('echarts', [function() {
        return {
            restrict: 'E',
            scope: {
                options: '=',
                height: '=',
                width: '='            
            },
            template: '<div class="echarts-container" ng-style="{ \'height\': height, \'width\': width }"></div>',
            replace: true,
            link: function (scope, ele, attrs) {
                var chart;

                scope.$watch('options', function(nv, ov) {
                    if(!chart) {
                        chart = echarts.init(ele[0]);
                    }

                    chart.setOption(nv);
                    scope.$emit('EVENT:CONTENTRESIZE');
                }, true);
            }
        };
    }]);
});
