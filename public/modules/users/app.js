angular.module('bitvagas.users', [
      'bitvagas.users.controllers'
    , 'bitvagas.users.services'
    ])
    .config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider){


        $stateProvider
        .state('signup', {
            url: '/signup'
          , views       : {
              ''        : {
                  templateUrl : 'modules/users/views/signup'
                , controller  : 'AuthController'
              }
              , 'signin@signup' : {
                  templateUrl : 'modules/users/views/signin'
                , controller  : 'AuthController'
              }
          }
        })
        .state('signin', {
            url: '/signin'
          , templateUrl : 'modules/users/views/signin'
          , controller  : 'AuthController'
        })
        .state('verify', {
            url: '/signup/verify'
          , templateUrl : 'modules/users/views/verify-message'
        })
        .state('forgot', {
            url: '/forgot'
          , templateUrl : 'modules/users/views/forgot'
          , controller  : 'AuthController'
        })
        .state('freelancers', {
            url: '/freelancers'
          , templateUrl   : 'modules/users/views/freelancers'
          , resolve       : {
              freelancers : ["FreelancerService", function(FreelancerService) {
                  return FreelancerService.findAll();
              }]
          }
          , controller  : 'FreelancerController'
        })
        .state('freelancers-cv', {
            url: '/freelancers/:id'
          , templateUrl  : 'modules/users/views/cv'
          , controller   : 'CVController'
          , resolve      : {
              freelancer : ["$q", '$state', "$stateParams", "FreelancerService", function($q, $state, $stateParams, FreelancerService) {
                var deferred = $q.defer();
                FreelancerService.findById($stateParams.id)
                .then(function(freelancer) {
                    return deferred.resolve(freelancer);
                }).catch(function(err){
                    deferred.reject(err);
                    $state.transitionTo('freelancers');
                });

                return deferred.promise;
              }]
          }
        });
    }]);
