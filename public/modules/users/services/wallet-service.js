angular.module('bitvagas.users.services')
.service('WalletService', WalletService);

WalletService.$inject = ['$http'];
function WalletService($http){
    this.createWallet = function(passphrase){
        return $http.post('/api/createwallet', { passphrase: passphrase });
    };

    this.updateWallet = function(){
        return $http.post('/api/updatewallet');
    };
}
