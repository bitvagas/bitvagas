angular.module('bitvagas.users.controllers',[])
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope','$state','UserService'];
function SignUpController ($scope, $state, UserService) {

    $scope.flash = {}

    $scope.create = function(user){
        UserService.create(user).then(function(data){
            $state.go('dashboard');
        },function(err){
            var errorList = [];
            console.log(err.data);
            for(var error in err.data)
                errorList.push(err.data[error][0]);

            $scope.flash.errors = errorList;
        });
    };
}
