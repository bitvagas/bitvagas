angular.module('bitvagas.admin', [ 'bitvagas.admin.controllers' ])
.config(function($urlRouterProvider, $stateProvider ){

    $stateProvider
    .state('dashboard', {
        abstract : true
        , url: '/dashboard'
        , templateUrl  : '/modules/admin/views/dashboard'
        , controller   : 'DashBoardController'
        , authenticate : true
    })
    .state('dashboard.overview', {
        url : '/overview'
        , templateUrl  : '/modules/admin/views/overview'
        , authenticate : true
    })
    .state('dashboard.profile', {
        url : '/profile'
        , views : {
            ''  : {
                templateUrl : '/modules/users/views/dashboard/profile'
            }
            , 'change-password@dashboard.profile' : {
                templateUrl : '/modules/users/views/change-password'
            }
        }
        , authenticate  : true
    })
    .state('dashboard.cv', {
        url : '/cv'
        , templateUrl  : '/modules/users/views/cv'
        , controller   : 'CVController'
        , authenticate : true
    });
});
