angular.module('bitvagas.users.controllers')
.controller('FreelancerController', FreelancerController)
.controller('CVController', CVController);

FreelancerController.$inject = ['$scope', 'freelancers'];
CVController.$inject = ['$scope', '$state', '$stateParams', 'FreelancerService'];
function CVController($scope, $state, $stateParams, FreelancerService){

    var id = $stateParams.id || $scope.currentUser.id;
    FreelancerService.findById(id).then(function(user){
        $scope.user = user.data;
        var linkedIn = user.data.LINKEDIN_TOKEN;
        if(linkedIn) {
            FreelancerService.getCV({ token : linkedIn}).then(function(data){
                $scope.user.cv = data.data;
            });
        }
    });
}

function FreelancerController ($scope, freelancers) {
    $scope.freelancers = freelancers.data;
}
