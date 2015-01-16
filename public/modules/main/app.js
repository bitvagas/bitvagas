angular.module('bitvagas.main', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider){

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('index', {
            url: '/'
          , templateUrl: 'modules/jobs/views/job-list'
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
    });
