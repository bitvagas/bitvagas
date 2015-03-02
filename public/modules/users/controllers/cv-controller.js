angular.module('bitvagas.users.controllers', [])
.controller('CVController', CVController);

CVController.$inject = ['$scope', '$state', '$stateParams', 'UserService'];
function CVController($scope, $state, $stateParams, UserService){
    console.log($scope.skills);
    if(UserService.current.LINKEDIN_TOKEN){
        UserService.cv().then(function(data){
            console.log(data);
            $scope.skills = data.data.skills.values;
        }, function(err){
            console.log(err);
        });
    }
}
