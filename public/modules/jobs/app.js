angular.module('bitvagas.jobs',
    [ 'ui.router'
    , 'bitvagas.jobs.controllers'
    , 'bitvagas.jobs.services'
    , 'bitvagas.jobs.category.services'
    , 'bitvagas.jobs.organization.services'
    ])
    .config(function($urlRouterProvider, $stateProvider){

        $stateProvider
        .state('jobs', {
            url: '/jobs'
          , templateUrl : '/modules/jobs/views/job-list'
          , controller  : 'JobListController'
        })
        .state('jobs-list', {
            url: '/jobs/list'
          , templateUrl : '/modules/jobs/views/job-list'
          , controller  : 'JobListController'
        })
        .state('jobs-create', {
            url: '/jobs/create'
          , templateUrl  : '/modules/jobs/views/job-create'
          , resolve      : {
              Categories : function(CategoryService){
                  return CategoryService.findAll();
              }
          }
          , controller   : 'JobCreateController'
        })
        .state('jobs-show', {
            url: '/jobs/:id'
          , templateUrl: '/modules/jobs/views/job-show'
          , controller : 'JobShowController'
        });
    });
