angular.module('bitvagas.users.controllers', [])
.controller('FreelancerController', FreelancerController)
.controller('CVController', CVController);

FreelancerController.$inject = ['$scope', 'FreelancerService'];
CVController.$inject = ['$scope', '$state', '$stateParams', 'FreelancerService'];
function CVController($scope, $state, $stateParams, FreelancerService){
    FreelancerService.findById($stateParams.id).then(function(user){
        $scope.user = user.data;
        var linkedIn = user.data.LINKEDIN_TOKEN;
        if(linkedIn) {
            FreelancerService.getCV({ token : linkedIn}).then(function(data){
                $scope.user.cv = data.data;
            });
        }
    });
}

function FreelancerController ($scope, FreelancerService) {
    FreelancerService.findAll().then(function(data){
        $scope.freelancers = data.data;
    });
}
