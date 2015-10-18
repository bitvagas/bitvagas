angular.module('bitvagas.dashboard.controllers')
.controller('OverviewController', OverviewController);

OverviewController.$inject = ['$rootScope', '$scope', 'lodash'];
function OverviewController($rootScope, $scope, lodash){

    $scope.tab = 1;

    $scope.setTab = function(tabId){
        $scope.tab = tabId;
    };

    $scope.isSet = function(tabId){
        return $scope.tab === tabId;
    };

    if($scope.currentUser &&
       $scope.currentUser.jobs) {
       $scope.AppliersLength = lodash
                              .chain($scope.currentUser.jobs)
                              .pluck('job_appliers')
                              .flatten()
                              .size()
                              .value();
    } else
        $scope.AppliersLength = 0;

    $scope.toggle = function(index, id){
        if($scope.$parent.open == index) {
            $scope.$parent.open = undefined;
            return;
        }

        $scope.$parent.open = index;
    };
}
