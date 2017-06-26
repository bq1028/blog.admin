define(['./controllers'], function (controllers) {
    'use strict';
    controllers.controller('navigation', ['$rootScope', '$injector', function ($rootScope, $injector) {
        $rootScope.curr = '';  

        $rootScope.$on('$routeChangeSuccess', function (event, curr, last) {
            if (curr.$$route) {
                $rootScope.curr = curr.$$route.name;
            }
        });
    }]);
});
