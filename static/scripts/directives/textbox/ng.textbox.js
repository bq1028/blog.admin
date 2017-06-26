/**
 * 指令：输入单元
 * @author Philip
 */

/** 
 * 配置（对象）
 * options:
 * class: 'table-striped table-bordered ui-grid-head'
 * sequence: true
 * sequenceWidth：'10%'
 * sequenceAlign: 'left'
 * sort: true
 * remote: 'www.nds.com/api/xx/xx'
 * dataFilter: function () {}
 */ 

define(['../directives', 'text!./ng.textbox.html'], function (directives, template) {
    'use strict';
    directives.directive('textbox', ['$http', function ($http) {
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
