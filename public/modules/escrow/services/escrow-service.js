angular.module('bitvagas.escrow.services', [])
.service('EscrowService', EscrowService);

EscrowService.$inject = ['$http'];
function EscrowService($http){

    this.create = function(data){
        return $http.post('/api/escrow', data);
    };
}
