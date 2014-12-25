angular.module('bitvagas.users', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider){

        $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: 'modules/users/views/signup'
        });
    });
