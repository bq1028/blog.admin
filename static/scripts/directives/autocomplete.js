/**
 * 指令：自动完成
 * @author Philip
 */

/** 
 * 配置（对象）
 * sequence: true
 * sequenceWidth：'10%'
 * sequenceAlign: 'left'
 * sequenceState: 'positive' | 'reverse'
 * sort: true
 * dataFilter: function () {}
 */ 

define(['./directives', 'text!./autocomplete.html'], function (directives, template) {
    'use strict';
    directives.directive('autocomplete', ['$http', function ($http) {
        return {
            restrict: 'E',
            scope: {
                        
            },
            template: template,
            replace: true,
            link: function (scope, ele, attrs) {
                scope.sortBy = function (key) {

                };
            }
        };
    }]);
});
