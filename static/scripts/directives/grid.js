/**
 * 指令：grid
 * @author Philip
 */

/** 
 * 列配置（数组）
 * columns:
 * value: 'value'
 * title: '例子'
 * width: '20%'
 * sortable: true
 * editable: {
    source: [] | url,
    autocomplete: true | false 
 } | false
 * editableType 'select' | 'textbox'
 * align: 'left'
 * validate: function () {} | 'mobile'
 * type: 'radio | checkbox'
 * sortState: 'asc' | 'desc'
 */

/** 
 * 表格配置（对象）
 * options:
 * class: 'table-striped table-bordered ui-grid-head'
 * sequence: true
 * sequenceWidth：'10%'
 * sequenceAlign: 'left'
 * sortState: 'asc' | 'desc'
 * sortable: true
 * dataFilter: function () {}
 */ 

define(['./directives', 'text!./grid.html'], function (directives, template) {
    'use strict';

    directives.directive('grid', ['$http', function ($http) {
        return {
            restrict: 'E',
            scope: {
                columns: '=',
                options: '=',
                source: '='            
            },
            template: template,
            replace: true,
            link: function (scope, ele, attrs) {
                var source = scope.source;
                var remote = typeof source === 'string';

                scope.isLoading = false;

                scope.getSource = function () {
                    scope.params = {};

                    scope.isLoading = true;

                    $http({
                        url: source,
                        method: 'get',
                        data: scope.params,
                        success: function (res) {
                            scope.source = scope.options.dataFilter(res);
                            scope.isLoading = false;
                        },
                        error: function (res) {
                            scope.isLoading = false;  
                        }
                    });
                };

                scope.sortBy = function (column) {

                    if(column === 'sequence') {
                        scope.source.reverse();
                        scope.options.sortState = scope.options.sortState === 'asc' ? 'desc' : 'asc';
                    } else {
                        var key = column.value;
                        var state = column.sortState = column.sortState === 'asc' ? 'desc' : 'asc';

                        if(remote) {
                            scope.getSource();
                        } else {
                            scope.source.sort(function (v1, v2) {
                                var result;

                                if( state === 'asc' ) {
                                    result = v1[key] - v2[key];
                                } else {
                                    result = v2[key] - v1[key];
                                }

                                return result;
                            });
                        }
                    }
                };
            }
        };
    }]);
});
