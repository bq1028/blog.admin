define(['./controllers'], function (controllers) {
    'use strict';
    controllers.controller('navigation', ['$rootScope', function ($rootScope) {
        $rootScope.curr = '';  

        $rootScope.$on('$routeChangeSuccess', function (event, curr, last) {
            if (curr.$$route) {
                $rootScope.curr = curr.$$route.name;
            }
        });
    }]);
});
