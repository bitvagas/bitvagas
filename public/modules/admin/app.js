angular.module('bitvagas.admin', ['bitvagas.admin.controllers'])
    .config(function($urlRouterProvider, $stateProvider){
        $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/admin/views/dashboard',
            controller: 'DashBoardController'
        });
    });
