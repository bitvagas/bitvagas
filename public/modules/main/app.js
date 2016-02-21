angular.module('bitvagas.main',
    ['bitvagas.main.factory'
    ,'bitvagas.main.controllers'
    ,'bitvagas.main.directives'
    ])
    .config(["$urlRouterProvider", "$stateProvider", "$locationProvider", function($urlRouterProvider, $stateProvider, $locationProvider){

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        $stateProvider
        .state('index', {
            url: '/'
          , views        : {
              ''         : {
                    templateUrl     : 'modules/main/views/index'
                  , controller      : 'JobListController'
              }
              , 'job-list@index'    : {
                    templateUrl     : 'modules/jobs/views/job-list'
                  , controller      : 'JobListController'
              }
              , 'job-sidebar@index' : {
                    templateUrl     : 'modules/jobs/views/job-sidebar'
              }
          }
        })
        .state('about', {
            url: '/about'
          , templateUrl: 'modules/main/views/about'
        })
        .state('terms', {
            url: '/terms'
          , templateUrl: 'modules/main/views/terms'
        })
        .state('contact', {
            url: '/contact'
          , templateUrl: 'modules/main/views/contact'
        });
    }]);
