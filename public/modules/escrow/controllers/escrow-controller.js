angular.module('bitvagas.escrow.controllers', [])
.controller('EscrowController', EscrowController);

EscrowController.$inject = ['$scope', '$state', 'FreelancerService', 'EscrowService'];
function EscrowController($scope, $state, FreelancerService, EscrowService){

    $scope.initBuyer = true;

    FreelancerService.findAll().then(function(users){
        console.log(users);
        $scope.users = users.data;
    });

    $scope.onChangeUser = function(selected){
        $scope.partner = selected;
        console.log(selected);
    };

    $scope.create = function(escrow){
        EscrowService.create(escrow).then(function(data){
            console.log(data);
        });
    };
}
