angular.module('bitvagas.main', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider){

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('about', {
            url: '/about',
            templateUrl: 'modules/main/views/about'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'modules/main/views/contact'
        });
    });
