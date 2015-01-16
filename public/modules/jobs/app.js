angular.module('bitvagas.jobs',
    [ 'ui.router'
    , 'bitvagas.jobs.controllers'
    , 'bitvagas.jobs.services'
    , 'bitvagas.jobs.category.services'
    ])
    .config(function($urlRouterProvider, $stateProvider){

        $stateProvider
        .state('jobs', {
            url: '/jobs'
          , templateUrl: '/modules/jobs/views/job-list',
        })
        .state('jobs-list', {
            url: 'jobs/list'
          , templateUrl: '/modules/jobs/views/job-list'
        })
        .state('jobs-create', {
            url: 'jobs/create'
          , templateUrl : '/modules/jobs/views/job-create'
          , controller  : 'JobCreateController'
        })
        .state('jobs-show', {
            url: '/jobs/:jobID'
          , templateUrl: '/modules/jobs/views/job-show'
        });
    });
