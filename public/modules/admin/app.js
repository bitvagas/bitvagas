angular.module('bitvagas.admin',
    [ 'bitvagas.admin.controllers'
    , 'bitvagas.admin.services'
    ])
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
                  templateUrl : '/modules/users/views/profile'
              }
            , 'cv@dashboard.profile' : {
                  templateUrl : '/modules/users/views/cv'
                , controller  : 'CVController'
              }
            , 'change-password@dashboard.profile' : {
                  templateUrl : '/modules/users/views/change-password'
              }
          }
          , authenticate  : true
        })
    }).run(function($rootScope, $state, AuthenticationService, UserService){
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            AuthenticationService.isAuthenticated().then(function(result){
                UserService.current = result.data;
            },function(err){
                if(toState.authenticate){
                    $state.transitionTo('signin');
                    event.preventDefault();
                }
            });
        });
    });
