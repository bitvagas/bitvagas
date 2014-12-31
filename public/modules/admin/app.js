angular.module('bitvagas.admin', ['ui.router','angular-flash.service', 'angular-flash.flash-alert-directive'])
    .config(function($urlRouterProvider, $stateProvider, flashProvider){
        flashProvider.errorClassnames.push('alert-danger');
        $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/admin/views/dashboard'
        });
    });
