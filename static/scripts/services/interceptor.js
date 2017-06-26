/**
 * 服务：拦截器
 * @author Philip
 */

define(['./services'], function (services) {
    'use strict';
    services.factory('interceptor', ["$q", "$rootScope", function ($q, $rootScope) {
        return {
            request:function(config){
                config.headers["TOKEN"] = '';
                return config;
            },
            responseError: function (response) {
                var data = response.data;
                
                if(data["errorCode"] == "500999"){
                    $rootScope.user = {token:""};
                    $rootScope.$emit("userIntercepted","notLogin",response);
                }

                if(data["errorCode"] == "500998"){
                    $rootScope.$emit("userIntercepted","sessionOut",response);
                }

                return $q.reject(response);
            }
        };            
    }]);
});
