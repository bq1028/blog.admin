/**
 * 指令：grid
 * @author Philip
 */

/** 
 * 列配置（数组）
 * columns:
 * field: 'field'
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
 * filter: function (res) {}
 */ 

define(['../directives', 'text!./ng.grid.html'], function (directives, template) {
    'use strict';

    var addListState = function (list) {
        for (var i = 0, len = list.length; i < len; i ++) {
            list[i].state = 'view';
        }

        return list;
    };

    directives.directive('grid', ['$http', function ($http) {
        return {
            restrict: 'E',
            scope: {
                columns: '=',
                options: '=',
                list: '=',
                remote: '='          
            },
            template: template,
            replace: true,
            link: function ($scope, ele, attrs) {
                $scope.list = $scope.list || [];
                $scope.list = addListState($scope.list);

                $scope.isLoading = false;

                /**
                 * 权限需登录
                 * @returns none
                 */                
                $scope.getList = function () {
                    $scope.params = {};
                    $scope.isLoading = true;

                    $http({
                        url: source,
                        method: 'get',
                        data: $scope.params,
                        success: function (res) {
                            var list = res;

                            if ($scope.options.filter) {
                                list = $scope.options.filter(list);
                            }

                            $scope.list = list;
                            $scope.isLoading = false;
                        },
                        error: function (res) {
                            $scope.isLoading = false;  
                        }
                    });
                };

                /**
                 * 排序
                 * @params { object } 列对象
                 * @returns none
                 */
                $scope.sortBy = function (column) {
                    if(column === 'sequence') {
                        $scope.source.reverse();
                        $scope.options.sortstate = $scope.options.sortstate === 'asc' ? 'desc' : 'asc';
                    } else {
                        var key = column.field;
                        var state = column.sortstate = column.sortstate === 'asc' ? 'desc' : 'asc';

                        if($scope.remote) {
                            $scope.getList();
                        } else {
                            $scope.list.sort(function (v1, v2) {
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

                /**
                 * 处理打开关闭
                 * @params { object } 列对象
                 * @returns none
                 */
                $scope.handleToggle = function () {

                };
            }
        };
    }]);
});
