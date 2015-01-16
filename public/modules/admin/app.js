angular.module('bitvagas.admin',
    [ 'bitvagas.admin.controllers'
    , 'bitvagas.admin.services'
    ])
    .config(function($urlRouterProvider, $stateProvider ){

        $stateProvider
        .state('dashboard', {
            abstract : true
          , url: '/dashboard'
          , templateUrl: '/modules/admin/views/dashboard'
          , controller: 'DashBoardController'
          , resolve : ['AuthenticationService', function(AuthenticationService) {
                logged : AuthenticationService
            }]
        })
        .state('dashboard.overview', {
            url : '/overview'
          , templateUrl : '/modules/admin/views/overview'
        })
        .state('dashboard.profile', {
            url : '/profile'
          , templateUrl : '/modules/admin/views/profile'
        });
    });
