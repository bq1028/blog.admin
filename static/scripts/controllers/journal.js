/**
 * 控制器：日志
 * @author Philip
 */

define(['./controllers'], function (controllers) {
    'use strict';
    controllers.controller('journalCtrl', ['$scope', '$injector', function ($scope, $injector) {
        var locals = {
            model: this
        };        
        
        $injector.invoke(model, this, {});
        $injector.invoke(config, $scope, {});   
        $injector.invoke(ctrl, $scope, locals);          
    }]);

    var ctrl = [function () {

    }];

    var config = [function () {
        this.columns = [{
            field: 'v1',
            title: '例子',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '30%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        }, {
            field: 'v2',
            title: '例子',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '30%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        }, {
            field: 'v3',
            title: '例子',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '30%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        }];

        this.options = {
            striped: true, 
            bordered: true,
            sequence: true,
            sequenceWidth: '10%', 
            sequenceAlign: 'left',
            sort: true            
        };

        this.remote = false;
    }];

    var model = [function () {
        this.list = [{ 
            v1: '1990', 
            v2: '2016', 
            v3: '2020' 
        }];
    }];    
});
