/*
*	Author:	Alex Thomas
*	Assignment:	WE4 Mobile	Web	Applications,	Digital	Skills	Academy
*	Date	:	2016/07/06
*/

angular.module('todoApp', ['ngRoute','ngAnimate'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: './partials/page-home.html',
                controller: 'homeController'
            })
            /* using the :index as parameter to know which todo is selected */
            .when('/todo/:index', {
                templateUrl: './partials/page-edit.html',
                controller: 'editController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    /* cache the views, trying to optimise for mobile speed a litle here even though its a tiny file anyways  */
    .run(function ($templateCache, $http) {
        $http.get('./partials/page-home.html', { cache: $templateCache });
        $http.get('./partials/page-edit.html', { cache: $templateCache });
    });
