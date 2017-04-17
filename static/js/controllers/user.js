/**
 * 控制器：用户
 * @author Philip
 */

define(['./controllers'], function (controllers) {
    'use strict';
    controllers.controller('userCtrl', ['$scope', '$injector', function ($scope, $injector) {
        var locals = {
            model: this
        };

        $injector.invoke(model, this, {});
        $injector.invoke(config, $scope, {});   
        $injector.invoke(ctrl, $scope, locals);   
    }]);

    var model = [function () {
        this.list = [{ 
            v1: '1991', 
            v2: '2016', 
            v3: '2025',
            v4: '2027',
            v5: '2029',
            v6: '2030'
        }, { 
            v1: '1992', 
            v2: '2016', 
            v3: '2025',
            v4: '2027',
            v5: '2029',
            v6: '2030'
        }, { 
            v1: '1993', 
            v2: '2016', 
            v3: '2025',
            v4: '2027',
            v5: '2029',
            v6: '2030'
        }, { 
            v1: '1993', 
            v2: '2016', 
            v3: '2025',
            v4: '2027',
            v5: '2029',
            v6: '2030'
        }, { 
            v1: '1993', 
            v2: '2016', 
            v3: '2025',
            v4: '2027',
            v5: '2029',
            v6: '2030'
        }];
    }];

    var config = [function () {
        this.columns = [{
            field: 'v1',
            title: '例子',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '15%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        },{
            field: 'v2',
            title: '例子',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '15%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        },{
            field: 'v3',
            title: '例子',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '15%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        },{
            field: 'v4',
            title: '例子',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '15%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        },{
            field: 'v5',
            title: '例子',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '15%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        },{
            field: 'v6',
            title: '例子',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '15%',
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
            sortable: true,
            sortState: 'asc',
            dataFilter: function () {}                
        };

        this.remote = false;
    }];

    var ctrl = [function () {

    }];        
});
