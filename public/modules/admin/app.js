angular.module('bitvagas.admin', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider){
        $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/admin/views/dashboard'
        });
    });
