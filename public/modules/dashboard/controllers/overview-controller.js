angular.module('bitvagas.dashboard.controllers')
.controller('OverviewController', OverviewController);


OverviewController.$inject = ['$scope', 'lodash'];
function OverviewController($scope, lodash){

    if($scope.currentUser.jobs)
        $scope.AppliersLength = lodash
                            .chain($scope.currentUser.jobs)
                            .pluck('job_appliers')
                            .flatten()
                            .size()
                            .value();

    $scope.toggle = function(index, id){
        if($scope.$parent.open == index)
            return;

        $scope.$parent.open = index;
    };
}
