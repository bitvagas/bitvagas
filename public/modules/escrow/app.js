angular.module('bitvagas.escrow', [
    'bitvagas.escrow.controllers'
   ,'bitvagas.escrow.services'
])
.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider){

    $stateProvider
    .state('escrow', {
        url: '/escrow'
      , templateUrl : '/modules/escrow/views/escrow-create'
      , controller  : 'EscrowController'
    })
    .state('dispute', {
        url: '/escrow/:id/dispute'
      , templateUrl : '/modules/escrow/views/dispute'
    });
}]);
