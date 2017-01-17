/**
 * 后台管理
 * @author Philip
 */

require.config({

    paths: {
        'text': './libs/requirejs/text',
        'domReady': './libs/requirejs/domReady',
        'angular': './libs/angular/angular.min',
        'angular-route': './libs/angular-route/angular-route.min'
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
    'angular.templates',
    'controllers/controllers',
    'controllers/root',
    'controllers/navigation',
    'controllers/index',
    'controllers/journal',
    'controllers/content',
    'controllers/user',
    'controllers/auth',
    'services/services',
    'services/interceptor',
    'directives/echarts',
    'directives/textbox',
    'directives/select',
    'directives/grid',
    'directives/scrollbar',
    'directives/fireworks',
    'filters/filters'
], function (text, domReady, ng, route, ngTemplates) {
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
            .when('/views', {
                name: 'admin',
                template: ngTemplates.templateIndex,
                controller: 'indexCtrl as model',
                reloadOnSearch: false
            })
            .when('/views/journal', {
                name: 'journal',
                template: ngTemplates.templateJournal,
                controller: 'journalCtrl as model',
                reloadOnSearch: false
            })
            .when('/views/user', {
                name: 'user',
                template: ngTemplates.templateUser,
                controller: 'userCtrl as model',
                reloadOnSearch: false
            })
            .when('/views/content', {
                name: 'content',
                template: ngTemplates.templateContent,
                controller: 'contentCtrl as model',
                reloadOnSearch: false
            }) 
            .when('/views/auth', {
                name: 'auth',
                template: ngTemplates.templateAuth,
                controller: 'authCtrl as model',
                reloadOnSearch: false
            })                            
            .otherwise({
                redirectTo: '/views'
            });
            
    }]);

    ng.bootstrap(document, ['app']);

    $('.navbar-toggle').click(function() {
        $('.main-menu').toggleClass('show');
    });
});
