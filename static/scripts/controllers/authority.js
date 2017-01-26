/**
 * 控制器：权限
 * @author Philip
 */

define(['./controllers'], function (controllers) {
    'use strict';
    controllers.controller('authorityCtrl', ['$scope', '$injector', function ($scope, $injector) {
        var locals = {
            model: this
        };

        $injector.invoke(model, this, {});
        $injector.invoke(config, $scope, {});   
        $injector.invoke(ctrl, $scope, locals);        
    }]);

    // 模型
    var model = [function () {
        this.list = [{ 
            name: '战术巡洋舰', 
            description: '攻击型，战术核武器', 
            type: '雷神类型',
            code: '1900'
        }];

        this.tab = 'role';
    }];

    // 控制器
    var ctrl = ['model', function (model) {
        this.$watch('model.list', function () {
            
        });

        this.handleSwtichTab = function (tab) {
            model.tab = tab;
        };
    }];

    // 配置
    var config = [function () {
        this.columns = [{
            field: 'name',
            title: '权限名称',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '20%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        }, {
            field: 'description',
            title: '描述',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '30%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'textbox'
        }, {
            field: 'type',
            title: '类型',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '20%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'select'
        }, {
            field: 'code',
            title: 'CODE',
            sortable: true,
            sortstate: 'asc',
            editable: true,
            width: '20%',
            validate: 'mobile',
            align: 'left',
            editabletype: 'select'
        }];

        this.options = {
            striped: true, 
            bordered: true,
            sequence: true,
            sequenceWidth: '10%', 
            sequenceAlign: 'left',
            sortable: true
        };

        this.remote = false;
    }];
});
