angular.module('bitvagas.users.controllers', [])
.controller('FreelancerController', FreelancerController)
.controller('CVController', CVController);

FreelancerController.$inject = ['$scope', 'UserService'];
CVController.$inject = ['$scope', '$state', '$stateParams', 'UserService'];
function CVController($scope, $state, $stateParams, UserService){
        UserService.findById($stateParams.id).then(function(user){
            $scope.user = user.data;
            var linkedIn = user.data.LINKEDIN_TOKEN;
            if(linkedIn){
                UserService.getCV({ token : linkedIn}).then(function(data){
                    $scope.user.cv = data.data;
                });
            }
        });
}

function FreelancerController ($scope, UserService) {

    UserService.findAll().then(function(data){
        $scope.freelancers = data.data;
    });
}
