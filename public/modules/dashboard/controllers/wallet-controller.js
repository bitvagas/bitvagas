angular.module('bitvagas.dashboard.controllers')
.controller('WalletController', WalletController);


WalletController.$inject = ['$rootScope', '$scope', '$state', '$compile', '$timeout', 'WalletService', 'SweetAlert'];
function WalletController($rootScope, $scope, $state, $compile, $timeout, WalletService, SweetAlert){

    var qrcode  = angular.element("<qr text='address' type-number='10' size='200' image='false'></qr>");

    $scope.current = $state.current.name;

    $scope.updateWallet = function(){
        WalletService.updateWallet().then(function(data){
            console.log(data);
        });
    };

    $scope.receive = function(){
        SweetAlert.swal({
            title: "Receive"
          , text: "<hr/><div id='qr'></div><span id='address'></span>"
          , html: true
          , imageUrl: 'img/wallet.svg'
          , animation: "slide-from-top"
          , showCancelButton: true
          , showConfirmButton: false
        }, function(){
        });

        $timeout(function(){
            angular.element(document.querySelector('#loading')).addClass('animated zoomOut');

            $scope.address = $rootScope.currentUser.WALLET_ID;

            //Append qr manually to sweet alert
            angular.element(document.querySelector('#qr')).append($compile(qrcode)($scope));
            //Display addres to sweet alert
            angular.element(document.querySelector('#address')).text($scope.address);
        },100);
    };

    $scope.createWallet = function(){
        SweetAlert.swal({
            title: "Wallet Password"
          , text: "This password will be asked to sign transactions"
          , imageUrl: 'img/wallet.svg'
          , animation: "slide-from-top"
          , type: 'input'
          , inputPlaceholder: 'Wallet Password (min. 8 characters)'
          , inputType: 'password'
          , showCancelButton: true
          , showConfirmButton: true
          , closeOnConfirm: false
          , showLoaderOnConfirm: true,
        }, function(value){
            if(value === false) return false;
            if(value === "" || value.length < 8) {
                swal.showInputError("Passphrase Invalid, at least 8 characters");
                return false;
            }

            WalletService.createWallet(value).then(function(data){
                SweetAlert.swal({
                    title: 'Wallet Created'
                  , text: 'Address: '+data.data.WALLET_ID
                });
            });
        });
    };
}
