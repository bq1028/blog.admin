/**
 * 后台管理
 * @author Philip
 */

require.config({
    paths: {
        'text': '../libs/requirejs/text',
        'domReady': '../libs/requirejs/domReady',
        'angular': '../libs/angular/angular.min',
        'angular-route': '../libs/angular-route/angular-route.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
    deps: [
        'text',
        'domReady'
    ],
    waitSeconds: 0
});

require([
    'text',
    'domReady',
    'angular',
    'angular-route',
    'template.views',
    'controllers/controllers',
    'controllers/root',
    'controllers/navigation',
    'controllers/index',
    'controllers/journal',
    'controllers/content',
    'controllers/user',
    'controllers/authority',
    'services/services',
    'services/interceptor',
    'directives/ng.echarts',
    'directives/ng.scrollbar',
    'directives/ng.fireworks',    
    'directives/textbox/ng.textbox',
    'directives/select/ng.select',
    'directives/grid/ng.grid',
    'filters/filters'
], function (text, domReady, ng, route, views) {
    'use strict';
    
    var app = ng.module('app', [
        'app.controllers',
        'app.directives',
        'app.filters',
        'app.services',
        'ngRoute'
    ]);

    app.config(['$httpProvider', '$locationProvider', function ($httpProvider, $locationProvider) {

        $httpProvider.interceptors.push('interceptor');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

    }]);

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {
                name: 'admin',
                template: views.index,
                controller: 'indexCtrl as model',
                reloadOnSearch: false
            })
            .when('/journal', {
                name: 'journal',
                template: views.journal,
                controller: 'journalCtrl as model',
                reloadOnSearch: false
            })
            .when('/user', {
                name: 'user',
                template: views.user,
                controller: 'userCtrl as model',
                reloadOnSearch: false
            })
            .when('/content', {
                name: 'content',
                template: views.content,
                controller: 'contentCtrl as model',
                reloadOnSearch: false
            }) 
            .when('/authority', {
                name: 'authority',
                template: views.authority,
                controller: 'authorityCtrl as model',
                reloadOnSearch: false
            })                            
            .otherwise({
                redirectTo: '/'
            });
            
    }]);

    ng.bootstrap(document, ['app']);

    $('.navbar-toggle').click(function() {
        $('.main-menu').toggleClass('show');
    });
});
