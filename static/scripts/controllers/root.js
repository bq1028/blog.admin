define(['./controllers'], function (controllers) {
    'use strict';
    controllers.controller('root', ['$rootScope', function ($rootScope) {
        $rootScope.$on('EVENT:CONTENTRESIZE', function () {

            $rootScope.$broadcast('EVENT:SCROLL-CONTENTRESIZE');
        });   

        $rootScope.onLogout = function () {
            location.href = '/logout';
        };    
    }]);
});
