angular.module('bitvagas.users.controllers')
.controller('FreelancerController', FreelancerController)
.controller('CVController', CVController);

CVController.$inject = ['$scope', 'freelancer'];
function CVController($scope, freelancer){
    $scope.user = freelancer.data
}

FreelancerController.$inject = ['$scope', 'freelancers'];
function FreelancerController($scope, freelancers) {
    $scope.freelancers = freelancers.data;
}
