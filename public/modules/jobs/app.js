angular.module('bitvagas.jobs', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider){

        $stateProvider
        .state('jobs', {
            url: '/',
            templateUrl: 'modules/jobs/views/job-list'
        })
        .state('jobs-list', {
            url: '/jobs',
            templateUrl: 'modules/jobs/views/job-list'
        })
        .state('jobs-create', {
            url: 'jobs/create',
            templateUrl: 'modules/jobs/views/job-create'
        });
    });
