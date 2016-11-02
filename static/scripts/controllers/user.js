/**
 * 控制器：用户
 * @author Philip
 */

define(['./controllers'], function (controllers) {
    'use strict';
    controllers.controller('userCtrl', ['$scope', function ($scope) {
        $scope.grid = {
            columns: [{
                value: 'v1',
                title: '例子',
                sortable: true,
                width: '15%',
                validate: 'mobile',
                align: 'left',
                editable: false,
                sortState: 'desc'
            },{
                value: 'v2',
                title: '例子',
                sortable: true,
                width: '15%',
                validate: 'mobile',
                align: 'left',
                editable: {
                    source: [],
                    autocomplete: true                    
                },                
                editableType: 'textbox',
                sortState: 'asc'
            },{
                value: 'v3',
                title: '例子',
                sortable: true,
                width: '15%',
                validate: 'mobile',
                align: 'left',
                editable: {
                    source: 'xxxxxxxxxxx',
                    autocomplete: true
                },                
                editableType: 'textbox',
                sortState: 'asc'
            },{
                value: 'v4',
                title: '例子',
                sortable: true,
                width: '15%',
                validate: 'mobile',
                align: 'left',
                editable: {
                    source: [],
                    autocomplete: true
                },                
                editableType: 'textbox',
                sortState: 'asc'
            },{
                value: 'v5',
                title: '例子',
                sortable: true,
                width: '15%',
                validate: 'mobile',
                align: 'left',
                editable: {
                    source: []
                },                
                editableType: 'select',
                sortState: 'asc'
            },{
                value: 'v6',
                title: '例子',
                sortable: true,
                width: '15%',
                validate: 'mobile',
                align: 'left',
                editable: {
                    source: 'xxxxx'
                },                
                editableType: 'select',
                sortState: 'desc'
            }],
            options: {
                striped: true, 
                bordered: true,
                sequence: true,
                sequenceWidth: '10%', 
                sequenceAlign: 'left',
                sortable: true,
                sortState: 'asc',
                dataFilter: function () {

                }                
            },
            source: [{ 
                v1: '1991', 
                v2: '2016', 
                v3: '2025',
                v4: '2027',
                v5: '2029',
                v6: '2030'
            },{ 
                v1: '1992', 
                v2: '2016', 
                v3: '2025',
                v4: '2027',
                v5: '2029',
                v6: '2030'
            },{ 
                v1: '1993', 
                v2: '2016', 
                v3: '2025',
                v4: '2027',
                v5: '2029',
                v6: '2030'
            }]
        };        
    }]);
});
