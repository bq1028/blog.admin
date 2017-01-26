define(['./controllers'], function (controllers) {
    'use strict';
    controllers.controller('root', ['$rootScope', '$injector', function ($rootScope, $injector) {
        var locals = {
            model: this
        };

        $injector.invoke(model, this, {});
        $injector.invoke(config, $rootScope, {});   
        $injector.invoke(ctrl, $rootScope, locals);   

        $rootScope.$on('EVENT:CONTENTRESIZE', function () {

            $rootScope.$broadcast('EVENT:SCROLL-CONTENTRESIZE');
        });   

        $rootScope.onLogout = function () {
            location.href = '/logout';
        };    
    }]);

    var model = [function () {

    }];

    var config = [function () {

    }];

    var ctrl = [function () {

    }];       
});
