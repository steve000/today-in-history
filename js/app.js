angular.module('myApp', ['ngRoute','myApp.controllers', 'myApp.services'])

.config(function(WeatherProvider){
        WeatherProvider.setApiKey('f2eb7ef433a9440d801bc8cc5c293659');
    })

.config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'MainController'
            })
            .when('/settings', {
                templateUrl: 'templates/settings.html',
                controller: 'SettingsController'
            })
            .otherwise({redirectTo: '/'})
    })
