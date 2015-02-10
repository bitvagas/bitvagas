angular.module('bitvagas.users.controllers',[])
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope', '$state', '$window', 'UserService'];
function SignUpController ($scope, $state, $window, UserService) {

    $scope.create = function(user){
        UserService.create(user).then(function(data){
            $state.go('index');
        },function(err){
            var errorList = [];
            console.log(err);
            if(err.data.detail === undefined)
                if(typeof err.data == 'Object')
                    for(var error in err.data)
                        errorList.push(err.data[error][0]);
                else
                    errorList.push(err.data);
            else
                errorList.push(err.data.detail);

            $scope.errors = errorList;
        });
    };
}
