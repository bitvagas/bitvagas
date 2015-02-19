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
          , controller   : 'OrgController'
          , authenticate : true
        })
        .state('dashboard.organization.list', {
            url : '/'
          , templateUrl : '/modules/organizations/views/org.list'
          , controller  : 'OrgController'
          , authenticate : true
        })
        .state('dashboard.organization.create', {
            url : '/create'
          , templateUrl : '/modules/organizations/views/org.create'
          , controller  : 'OrgController'
          , authenticate : true
        })
        .state('dashboard.organization.edit', {
            url : '/edit/:OrgID'
          , templateUrl : '/modules/organizations/views/org.edit'
          , controller  : 'OrgController'
          , authenticate : true
        });
    });
