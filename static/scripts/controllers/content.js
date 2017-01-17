/**
 * 控制器：内容
 * @author Philip
 */

define(['./controllers'], function (controllers) {
    'use strict';
    controllers.controller('contentCtrl', ['$scope', function ($scope) {
        $scope.grid = {
            columns: [{
                value: 'v1',
                title: '例子',
                sort: true,
                editable: true,
                width: '30%',
                validate: 'mobile',
                align: 'left',
                editableType: 'textbox'
            }, {
                value: 'v2',
                title: '例子',
                sort: true,
                editable: true,
                width: '30%',
                validate: 'mobile',
                align: 'left',
                editableType: 'textbox'
            }, {
                value: 'v3',
                title: '例子',
                sort: true,
                editable: true,
                width: '30%',
                validate: 'mobile',
                align: 'left',
                editableType: 'select'
            }],
            options: {
                striped: true, 
                bordered: true,
                sequence: true,
                sequenceWidth: '10%', 
                sequenceAlign: 'left',
                sort: true            
            },
            source: [{ 
                v1: '1990', 
                v2: '2016', 
                v3: '2020' 
            }]
        };           
    }]);

    var ctrl = function () {

    };

    var model = function () {

    };
});
