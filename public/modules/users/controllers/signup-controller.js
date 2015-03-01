angular.module('bitvagas.users.controllers')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope', '$state', '$window', 'UserService', 'ErrorHandling'];
function SignUpController ($scope, $state, $window, UserService, ErrorHandling) {

    $scope.create = function(user){
        if($scope.form.$valid) {
            UserService.create(user).then(function(data){
                $state.go('index');
            },function(err){
                $scope.errors = ErrorHandling.getErrors(err.data);
            });
        }
    };
}
