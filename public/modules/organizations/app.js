angular.module('bitvagas.org',
    [ 'bitvagas.org.controllers'
    , 'bitvagas.org.services'
    ])
    .config(function($urlRouterProvider, $stateProvider){

        $stateProvider
        .state('dashboard.organization', {
            url: '/organization'
          , abstract : true
          , templateUrl  : '/modules/organizations/views/organizations'
          , authenticate : true
        })
        .state('dashboard.organization.list', {
            url : '/'
          , templateUrl  : '/modules/organizations/views/org.list'
          , authenticate : true
          , controller   : 'OrgController'
        })
        .state('dashboard.organization.create', {
            url : '/create'
          , templateUrl  : '/modules/organizations/views/org.create'
          , authenticate : true
          , controller   : 'OrgController'
        })
        .state('dashboard.organization.edit', {
            url : '/edit/:OrgID'
          , templateUrl  : '/modules/organizations/views/org.edit'
          , authenticate : true
          , controller   : 'OrgController'
        });
    });
