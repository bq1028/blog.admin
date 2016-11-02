/**
 * 指令：日期控件
 * @author Philip
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

            }
        };
    }]);
});
